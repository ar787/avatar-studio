import { createContext } from 'react';
import type { User } from 'firebase/auth';

type AuthContextType = {
  currentUser: User | null;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAuthenticated: false,
});
