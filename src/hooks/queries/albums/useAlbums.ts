import { useQuery } from '@tanstack/react-query';
import { getAlbums } from '@/services/api/album.api';
import { queryKeys } from '../queryKeys';

export function useAlbums() {
  const {
    data: albums = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.albums(),
    queryFn: getAlbums,
  });
  return { albums, isLoading, error };
}
