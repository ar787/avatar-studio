import { useMutation } from '@tanstack/react-query';
import { deleteAlbum } from '@/services/api/album.api';
import type { Album } from '@/types/album';
import { queryKeys } from '../queryKeys';

export function useDeleteAlbum() {
  const { mutateAsync: remove, isPending } = useMutation({
    mutationFn: (id: string) => deleteAlbum(id),
    onMutate: async (id, context) => {
      await context.client.cancelQueries({ queryKey: queryKeys.albums() });
      const previous = context.client.getQueryData(queryKeys.albums());
      context.client.setQueryData<Album[]>(queryKeys.albums(), (old) => {
        return old?.filter((album) => album.id !== id);
      });

      return { previous };
    },
    onError: (_err, _vars, onMutateResult, context) => {
      context.client.setQueryData(queryKeys.albums(), onMutateResult?.previous);
    },
    onSettled: (_data, _error, _vars, _onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: queryKeys.albums() });
    },
  });
  return { remove, isPending };
}
