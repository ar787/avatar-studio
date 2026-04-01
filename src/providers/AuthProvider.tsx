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
import type { UserProfile } from '../types/userProfile';
import {
  signOutUser,
  signInUser,
  signUpUser,
  createUserDocument,
  getUserProfile,
} from '../services/api';

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentUserProfile, setCurrentUserProfile] =
    useState<UserProfile | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    const userProfile = (await getUserProfile()).data;
    setCurrentUserProfile(userProfile);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setIsInitialLoading(false);

      if (user) {
        refreshProfile();
      } else {
        setCurrentUserProfile(null);
      }
    });

    return unsubscribe;
  }, [refreshProfile]);

  const setProfileData = useCallback((newData: Partial<UserProfile>) => {
    setCurrentUserProfile((prev) => {
      if (!prev) return null;

      return { ...prev, ...newData };
    });
  }, []);

  const logOut = useCallback(async () => {
    setIsInitialLoading(true);
    await signOutUser();
  }, []);

  const signIn = useCallback((email: string, password: string) => {
    return signInUser(email, password);
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    const result = await signUpUser(email, password);
    await createUserDocument();

    return result;
  }, []);

  const value: AuthState = useMemo(() => {
    return {
      currentUser,
      currentUserProfile,
      isAuthenticated: currentUser !== null,
      isInitialLoading,
      refreshProfile,
      setProfileData,
      logOut,
      signIn,
      signUp,
    };
  }, [
    currentUser,
    currentUserProfile,
    isInitialLoading,
    refreshProfile,
    setProfileData,
    logOut,
    signIn,
    signUp,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
