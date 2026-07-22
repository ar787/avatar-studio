import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';

import { signIn, signUp, signInWithGoogle } from './auth/authThunks';
import { addNotification } from './notification/notificationSlice';
import {
  generationStarted,
  progressAdvanced,
  generationSucceeded,
  generationFailed,
  progressReset,
} from './avatarGeneration/avatarGenerationSlice';
import type { RootState } from './index';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(
    signIn.fulfilled,
    signUp.fulfilled,
    signInWithGoogle.fulfilled,
  ),
  effect: async (_, listenerApi) => {
    listenerApi.dispatch(
      addNotification({
        severity: 'success',
        message: 'Authentication successful',
      }),
    );
  },
});

listenerMiddleware.startListening({
  matcher: isAnyOf(signIn.rejected, signUp.rejected, signInWithGoogle.rejected),
  effect: async (_, listenerApi) => {
    listenerApi.dispatch(
      addNotification({
        severity: 'error',
        message: 'Authentication failed',
      }),
    );
  },
});

listenerMiddleware.startListening({
  actionCreator: generationStarted,
  effect: async (_, listenerApi) => {
    listenerApi.cancelActiveListeners();

    while (
      (listenerApi.getState() as RootState).avatarGeneration.progress < 90
    ) {
      const finished = await listenerApi.condition(
        isAnyOf(generationSucceeded, generationFailed),
        1000,
      );
      if (finished) return;
      listenerApi.dispatch(progressAdvanced());
    }
  },
});

listenerMiddleware.startListening({
  matcher: isAnyOf(generationSucceeded, generationFailed),
  effect: async (_, listenerApi) => {
    await listenerApi.delay(1000);
    listenerApi.dispatch(progressReset());
  },
});
