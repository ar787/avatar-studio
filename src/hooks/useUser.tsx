import { useAppDispatch } from '@/store/hooks';
import type { UserProfile } from '@/types/userProfile';
import { setProfile as setProfileAction } from '@/store/user/userSlice';
export const useUser = () => {
  const dispatch = useAppDispatch();

  const setProfile = (data: Partial<UserProfile>) => {
    dispatch(setProfileAction(data));
  };

  return { setProfile };
};
