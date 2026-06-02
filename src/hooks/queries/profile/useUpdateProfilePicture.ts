import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '@/store/hooks';
import { updateProfilePicture as updateUserProfilePicture } from '@/services/api/user.api';
import { setProfile } from '@/store/user/userSlice';

export function useUpdateProfilePicture() {
  const dispatch = useAppDispatch();
  const { mutateAsync: updateProfilePicture, isPending } = useMutation({
    mutationFn: (file: File) => updateUserProfilePicture(file),
    onSuccess: ({ picture }) => {
      dispatch(setProfile({ picture }));
    },
  });

  return { updateProfilePicture, isPending };
}
