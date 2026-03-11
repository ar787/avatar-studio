import type { User } from 'firebase/auth';

export type AuthState = {
  currentUser: User | null;
  isAuthenticated: boolean;
  isInitialLoading: boolean;
  logOut: () => Promise<void>;
};
