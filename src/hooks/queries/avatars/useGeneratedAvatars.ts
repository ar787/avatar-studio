import { useQuery } from '@tanstack/react-query';
import { getGeneratedAvatars } from '@/services/api/avatar.api';
import { queryKeys } from '../queryKeys';

export function useGeneratedAvatars() {
  const {
    data: generatedAvatars = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.generatedAvatars(),
    queryFn: getGeneratedAvatars,
  });
  return { generatedAvatars, isLoading, error };
}
