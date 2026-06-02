import { updateProfile as updateUserProfile } from '@/services/api/user.api';
import type { UserProfile } from '@/types/userProfile';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '@/store/hooks';
import { setProfile } from '@/store/user/userSlice';

export function useUpdateProfile() {
  const dispatch = useAppDispatch();
  const { mutateAsync: updateProfile, isPending } = useMutation({
    mutationFn: async (data: Partial<UserProfile>) => {
      await updateUserProfile(data);
      return data;
    },
    onSuccess: (updatedProfile) => {
      dispatch(setProfile(updatedProfile));
    },
  });

  return { updateProfile, isPending };
}
