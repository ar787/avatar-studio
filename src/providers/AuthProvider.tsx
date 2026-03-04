import { onAuthStateChanged, type User } from 'firebase/auth';
import { useEffect, useMemo, useState, type ReactElement } from 'react';
import { auth } from '../services/firebase';
import { AuthContext } from '../contexts/AuthContext';
import type { AuthState } from '../types/auth';

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const value: AuthState = useMemo(() => {
    return {
      currentUser,
      isAuthenticated: currentUser !== null,
      isInitialLoading,
    };
  }, [currentUser, isInitialLoading]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsInitialLoading(false);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
