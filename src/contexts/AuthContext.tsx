import { createContext } from 'react';
import type { AuthState } from 'src/types/auth';

export const AuthContext = createContext<AuthState>({
  currentUser: null,
  isAuthenticated: false,
  isInitialLoading: true,
  logOut: () => Promise.resolve(),
});
