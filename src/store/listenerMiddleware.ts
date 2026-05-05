import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';

import { signIn, signUp, signInWithGoogle } from './auth/authThunks';
import { addNotification } from './notification/notificationSlice';

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
