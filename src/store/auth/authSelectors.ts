import type { RootState } from '@/store';

export const selectAuthUser = (state: RootState) => state.auth.user;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectIsInitialLoading = (state: RootState) =>
  state.auth.isInitialLoading;
