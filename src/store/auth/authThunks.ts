import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  signInUser,
  signOutUser,
  signUpUser,
  signInByGoogleAccount,
  createUserDocument,
} from '@/services/api/auth.api';
import { fetchUserProfile } from '../user/userThunks';

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (
    { email, password }: { email: string; password: string },
    { dispatch },
  ) => {
    const result = await signInUser(email, password);
    await dispatch(fetchUserProfile());
    return result.user.toJSON();
  },
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (
    { email, password }: { email: string; password: string },
    { dispatch },
  ) => {
    const result = await signUpUser(email, password);
    await createUserDocument();
    await dispatch(fetchUserProfile());
    return result.user.toJSON();
  },
);

export const signInWithGoogle = createAsyncThunk(
  'auth/google',
  async (_, { dispatch }) => {
    const result = await signInByGoogleAccount();
    await createUserDocument();
    await dispatch(fetchUserProfile());
    return result.user.toJSON();
  },
);

export const logOut = createAsyncThunk('auth/logout', async () => {
  await signOutUser();
});
