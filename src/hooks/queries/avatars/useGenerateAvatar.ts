import { useMutation } from '@tanstack/react-query';
import { generateAvatar } from '@/services/api/avatar.api';
import { useAppDispatch } from '@/store/hooks';
import { setProfile } from '@/store/user/userSlice';
import type { AvatarStyle } from '@/types/avatar';
import { queryKeys } from '../queryKeys';

export function useGenerateAvatar() {
  const dispatch = useAppDispatch();
  const { mutateAsync: generate, isPending } = useMutation({
    mutationFn: ({ prompt, style }: { prompt: string; style: AvatarStyle }) =>
      generateAvatar(prompt, style),
    onSuccess: ({ data }, _vars, _onMutateResult, context) => {
      dispatch(setProfile({ credits: data?.remainingCredits ?? 0 }));
      context.client.invalidateQueries({
        queryKey: queryKeys.generatedAvatars(),
      });
    },
  });
  return { generate, isPending };
}
