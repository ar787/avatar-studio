import { useMutation } from '@tanstack/react-query';
import { createAlbum } from '@/services/api/album.api';
import type { Album } from '@/types/album';
import { queryKeys } from '../queryKeys';

export function useCreateAlbum() {
  const { mutateAsync: create, isPending } = useMutation({
    mutationFn: (name: string) => createAlbum(name),
    onMutate: async (name, context) => {
      await context.client.cancelQueries({ queryKey: queryKeys.albums() });
      const previous = context.client.getQueryData<Album[]>(queryKeys.albums());

      const optimistic: Album = {
        id: crypto.randomUUID(),
        userId: '',
        name,
        avatarCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        coverImageUrl: '',
      };

      context.client.setQueryData<Album[]>(queryKeys.albums(), (old = []) => [
        ...old,
        optimistic,
      ]);

      return { previous };
    },
    onError: (_err, _vars, onMutateResult, context) => {
      context.client.setQueryData(queryKeys.albums(), onMutateResult?.previous);
    },
    onSettled: (_data, _error, _vars, _onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: queryKeys.albums() });
    },
  });
  return { create, isPending };
}
