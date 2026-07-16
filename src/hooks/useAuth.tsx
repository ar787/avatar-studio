import { useQueryClient } from '@tanstack/react-query';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  signIn as signInThunk,
  signUp as signUpThunk,
  signInWithGoogle as signInWithGoogleThunk,
  logOut as logoutThunk,
} from '@/store/auth/authThunks';
import {
  selectIsAuthenticated,
  selectIsInitialLoading,
} from '@/store/auth/authSelectors';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const isInitialLoading = useAppSelector(selectIsInitialLoading);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const signIn = async (email: string, password: string) => {
    return await dispatch(signInThunk({ email, password })).unwrap();
  };

  const signUp = async (email: string, password: string) => {
    return await dispatch(signUpThunk({ email, password })).unwrap();
  };

  const signInWithGoogle = async () => {
    return await dispatch(signInWithGoogleThunk()).unwrap();
  };

  const logOut = async () => {
    await dispatch(logoutThunk()).unwrap();
    queryClient.clear();
  };
  return {
    isAuthenticated,
    isInitialLoading,
    signIn,
    signUp,
    signInWithGoogle,
    logOut,
  };
};

export type UseAuthReturn = ReturnType<typeof useAuth>;
