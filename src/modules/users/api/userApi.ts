import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { GetUserDto } from '../types/userTypes';
import { api } from '../../shared/api/sharedApi';

export const useGetUserById = (
  userId: number | null,
  options?: Omit<
    UseQueryOptions<GetUserDto, Error, GetUserDto>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<GetUserDto, Error>({
    queryKey: ['getUserById', userId],
    queryFn: async () => {
      if (userId === null) {
        throw new Error('User ID is null');
      }
      return api.get(`users/${userId}`).json<GetUserDto>();
    },
    enabled: userId !== null,
    ...options,
  });
};
