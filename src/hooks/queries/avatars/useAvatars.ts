import { useQuery } from '@tanstack/react-query';
import { getAvatars } from '@/services/api/avatar.api';
import { queryKeys } from '../queryKeys';

export function useAvatars() {
  const {
    data: avatars = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.avatars(),
    queryFn: getAvatars,
  });
  return { avatars, isLoading, error };
}
