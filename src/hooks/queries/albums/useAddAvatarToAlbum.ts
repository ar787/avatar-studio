import { addToAlbum } from '@/services/api/album.api';
import { useMutation } from '@tanstack/react-query';
import type { Album, GetAlbumApiReturn } from '@/types/album';
import { queryKeys } from '../queryKeys';

export function useAddAvatarToAlbum() {
  const { mutateAsync: addAvatarToAlbum, isPending } = useMutation({
    mutationFn: ({ id, avatarId }: { id: string; avatarId: string }) =>
      addToAlbum(id, avatarId),
    onMutate: async ({ id }, context) => {
      await context.client.cancelQueries({ queryKey: queryKeys.albums() });
      await context.client.cancelQueries({ queryKey: queryKeys.album(id) });

      const previousAlbums = context.client.getQueryData<Album[]>(
        queryKeys.albums(),
      );
      const previousAlbum = context.client.getQueryData<GetAlbumApiReturn>(
        queryKeys.album(id),
      );

      context.client.setQueryData<Album[]>(queryKeys.albums(), (old = []) =>
        old.map((album) =>
          album.id === id
            ? { ...album, avatarCount: album.avatarCount + 1 }
            : album,
        ),
      );

      context.client.setQueryData<GetAlbumApiReturn>(
        queryKeys.album(id),
        (old) => {
          if (!old) return old;
          return {
            ...old,
            albumMetadata: {
              ...old.albumMetadata,
              avatarCount: old.albumMetadata.avatarCount + 1,
            },
          };
        },
      );

      return { previousAlbums, previousAlbum };
    },
    onError: (_err, { id }, onMutateResult, context) => {
      context.client.setQueryData(
        queryKeys.albums(),
        onMutateResult?.previousAlbums,
      );
      context.client.setQueryData(
        queryKeys.album(id),
        onMutateResult?.previousAlbum,
      );
    },
    onSettled: (_data, _error, { id }, _onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: queryKeys.albums() });
      context.client.invalidateQueries({ queryKey: queryKeys.album(id) });
    },
  });

  return { addAvatarToAlbum, isPending };
}
