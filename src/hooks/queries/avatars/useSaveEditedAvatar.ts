import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveEditedAvatar } from '@/services/api/avatar.api';
import { useNotification } from '@hooks/useNotification';
import { useAppDispatch } from '@/store/hooks';
import { setProfile } from '@/store/user/userSlice';
import type {
  AdjustState,
  GeneratedAvatarType,
  PresetType,
} from '@/types/avatar';
import { queryKeys } from '../queryKeys';

export function useSaveEditedAvatar() {
  const notify = useNotification();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { mutateAsync: saveEdited, isPending } = useMutation({
    mutationFn: (vars: {
      blob: Blob;
      originalName: string;
      albumId: string;
      avatarId: string;
      adjustments: AdjustState;
      preset: PresetType | null;
    }) => saveEditedAvatar(vars),
    onSuccess: ({ avatar, remainingCredits }, { albumId }) => {
      dispatch(setProfile({ credits: remainingCredits }));
      // Write the returned avatar (with adjustments/preset) into the cache
      // immediately so chips render without waiting for the refetch.
      queryClient.setQueryData<GeneratedAvatarType[]>(
        queryKeys.generatedAvatars(),
        (prev) => (prev ? [avatar, ...prev] : [avatar]),
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.generatedAvatars() });
      if (albumId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.album(albumId) });
      }
      notify.success('Edited avatar saved!');
    },
    onError: (err: Error) => {
      notify.error(err.message ?? 'Failed to save edited avatar.');
    },
  });

  return { saveEdited, isPending };
}
