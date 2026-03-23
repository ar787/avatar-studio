import type { User, UserCredential } from 'firebase/auth';
import type { UserProfile } from './userProfile';

export type AuthState = {
  currentUser: User | null;
  currentUserProfile: UserProfile | null;
  isAuthenticated: boolean;
  isInitialLoading: boolean;
  setProfileData: (newData: Partial<UserProfile>) => void;
  logOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
};
