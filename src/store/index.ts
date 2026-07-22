import {
  configureStore,
  type Action,
  type ThunkAction,
} from '@reduxjs/toolkit';

import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';
import notificationReducer from './notification/notificationSlice';
import avatarGenerationReducer from './avatarGeneration/avatarGenerationSlice';
import { listenerMiddleware } from './listenerMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    notification: notificationReducer,
    avatarGeneration: avatarGenerationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
