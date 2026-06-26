import { useMutation } from '@tanstack/react-query';
import { deleteAvatarFromAlbum } from '@/services/api/album.api';
import type { GetAlbumApiReturn } from '@/types/album';
import { queryKeys } from '../queryKeys';

export function useDeleteAvatarFromAlbum(albumId: string) {
  const { mutateAsync: removeAvatar, isPending } = useMutation({
    mutationFn: (avatarId: string) => deleteAvatarFromAlbum(albumId, avatarId),
    onMutate: async (avatarId, context) => {
      await context.client.cancelQueries({
        queryKey: queryKeys.album(albumId),
      });
      const previous = context.client.getQueryData(queryKeys.album(albumId));
      context.client.setQueryData<GetAlbumApiReturn>(
        queryKeys.album(albumId),
        (old) => {
          if (!old) return old;
          return {
            ...old,
            avatars: old.avatars.filter((avatar) => avatar.id !== avatarId),
          };
        },
      );
      return { previous };
    },
    onError: (_error, _vars, onMutateResult, context) => {
      context.client.setQueryData(
        queryKeys.album(albumId),
        onMutateResult?.previous,
      );
    },
    onSettled: (_data, _error, _vars, _onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: queryKeys.album(albumId) });
    },
  });
  return { removeAvatar, isPending };
}
