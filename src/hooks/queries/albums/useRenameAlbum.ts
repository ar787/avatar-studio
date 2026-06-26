import { useMutation } from '@tanstack/react-query';
import { updateAlbum } from '@/services/api/album.api';
import type { Album } from '@/types/album';
import { queryKeys } from '../queryKeys';

export function useRenameAlbum() {
  const { mutateAsync: rename, isPending } = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateAlbum(id, name),
    onMutate: async ({ id, name }, context) => {
      await context.client.cancelQueries({ queryKey: queryKeys.albums() });

      const previous = context.client.getQueryData<Album[]>(queryKeys.albums());

      context.client.setQueryData<Album[]>(queryKeys.albums(), (old = []) =>
        old.map((el) => (el.id === id ? { ...el, name } : el)),
      );
      return { previous };
    },
    onError: (_err, _vars, onMutateResult, context) => {
      context.client.setQueryData(queryKeys.albums(), onMutateResult?.previous);
    },
    onSuccess: (_data, { id }, _onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: queryKeys.album(id) });
    },
    onSettled: (_data, _error, _vars, _onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: queryKeys.albums() });
    },
  });
  return { rename, isPending };
}
