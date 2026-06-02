import { useQuery } from '@tanstack/react-query';
import { getAlbum } from '@/services/api/album.api';
import { queryKeys } from '../queryKeys';

export function useAlbum(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.album(id),
    queryFn: () => getAlbum(id),
    enabled: !!id,
  });
  return { album: data, isLoading, error };
}
