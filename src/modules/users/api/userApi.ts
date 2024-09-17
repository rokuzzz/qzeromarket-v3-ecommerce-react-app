import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

import { GetUserDto, GetUsersParams, UpdateUserDto } from '../types/userTypes';
import { api } from '../../shared/api/sharedApi';
import { PaginatedResult } from '../../shared/types/sharedTypes';

export const useGetAllUsers = (
  params?: GetUsersParams,
  options?: Omit<
    UseQueryOptions<PaginatedResult<GetUserDto>, Error>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<PaginatedResult<GetUserDto>, Error>({
    queryKey: ['getAllUsers', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.append('page', params.page.toString());
      if (params?.perPage)
        searchParams.append('perPage', params.perPage.toString());
      if (params?.role) searchParams.append('role', params.role);

      return api
        .get('users', { searchParams })
        .json<PaginatedResult<GetUserDto>>();
    },
    ...options,
  });
};

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

export const useGetCurrentUser = (
  options?: Omit<
    UseQueryOptions<GetUserDto, Error, GetUserDto>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<GetUserDto, Error>({
    queryKey: ['getCurrentUser'],
    queryFn: async () => {
      return api.get('users/me').json<GetUserDto>();
    },
    enabled: true,
    ...options,
  });
};

export const useUpdateUser = (
  userId: number,
  options?: UseMutationOptions<GetUserDto, Error, UpdateUserDto>
) => {
  return useMutation<GetUserDto, Error, UpdateUserDto>({
    mutationFn: async (userData) => {
      // Filter out any undefined values
      const updatedData = Object.fromEntries(
        Object.entries(userData).filter(([_, value]) => value !== undefined)
      );

      return api
        .patch(`users/${userId}`, { json: updatedData })
        .json<GetUserDto>();
    },
    ...options,
  });
};

export const useDeleteUser = (
  options?: UseMutationOptions<void, Error, number>
) => {
  return useMutation<void, Error, number>({
    mutationFn: async (userId: number) => {
      await api.delete(`users/${userId}`).then((response) => {
        if (response.status !== 204) {
          throw new Error('Failed to delete user');
        }
      });
    },
    ...options,
  });
};
