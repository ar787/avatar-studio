import { useMutation, useQueryClient } from '@tanstack/react-query';
import { generateAvatar } from '@/services/api/avatar.api';
import { useAppDispatch } from '@/store/hooks';
import { setProfile } from '@/store/user/userSlice';
import type { AvatarStyle } from '@/types/avatar';
import { queryKeys } from '../queryKeys';

export function useGenerateAvatar() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { mutateAsync: generate, isPending } = useMutation({
    mutationFn: ({ prompt, style }: { prompt: string; style: AvatarStyle }) =>
      generateAvatar(prompt, style),
    onSuccess: ({ data }) => {
      dispatch(setProfile({ credits: data?.remainingCredits ?? 0 }));
      queryClient.invalidateQueries({ queryKey: queryKeys.generatedAvatars() });
    },
  });
  return { generate, isPending };
}
