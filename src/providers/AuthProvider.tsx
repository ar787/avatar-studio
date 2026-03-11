import { onAuthStateChanged, type User } from 'firebase/auth';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactElement,
} from 'react';
import { auth } from '../services/firebase';
import { AuthContext } from '../contexts/AuthContext';
import type { AuthState } from '../types/auth';
import { signOutUser } from '../services/api';

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsInitialLoading(false);
    });

    return unsubscribe;
  }, []);

  const logOut = useCallback(async () => {
    setIsInitialLoading(true);
    await signOutUser();
  }, []);

  const value: AuthState = useMemo(() => {
    return {
      currentUser,
      isAuthenticated: currentUser !== null,
      isInitialLoading,
      logOut,
    };
  }, [currentUser, isInitialLoading, logOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
