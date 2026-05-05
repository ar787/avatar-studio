import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { setUser, setLoading } from './auth/authSlice';
import { clearProfile } from './user/userSlice';

import type { AppDispatch } from './index';
import { fetchUserProfile } from './user/userThunks';

export const initAuthListener = (dispatch: AppDispatch) => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    dispatch(setUser(user?.toJSON() as User | null));
    if (user) {
      dispatch(fetchUserProfile());
    } else {
      dispatch(clearProfile());
    }
    dispatch(setLoading(false));
  });
  return unsubscribe;
};
