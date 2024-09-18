import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

import { api } from '../api/apiClient';
import { PaginatedResult, ApiError } from '../types/sharedTypes';
import {
  GetCategoryDto,
  CreateCategoryDto,
  PartialUpdateCategoryDto,
  GetCategoriesParams,
} from '../types/categoryTypes';

export const useGetAllCategories = (
  params?: GetCategoriesParams,
  options?: Omit<
    UseQueryOptions<PaginatedResult<GetCategoryDto>, ApiError>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<PaginatedResult<GetCategoryDto>, ApiError>({
    queryKey: ['getAllCategories', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.append('page', params.page.toString());
      if (params?.perPage)
        searchParams.append('perPage', params.perPage.toString());
      if (params?.categoryId)
        searchParams.append('parentCategoryId', params.categoryId.toString());

      return api
        .get('categories', { searchParams })
        .json<PaginatedResult<GetCategoryDto>>();
    },
    ...options,
  });
};

export const useGetCategoryById = (
  categoryId: number | null,
  options?: Omit<
    UseQueryOptions<GetCategoryDto, ApiError, GetCategoryDto>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<GetCategoryDto, ApiError>({
    queryKey: ['getCategoryById', categoryId],
    queryFn: async () => {
      if (categoryId === null) {
        throw new Error('Category ID is null');
      }
      return api.get(`categories/${categoryId}`).json<GetCategoryDto>();
    },
    enabled: categoryId !== null,
    ...options,
  });
};

export const useCreateCategory = (
  options?: UseMutationOptions<GetCategoryDto, ApiError, CreateCategoryDto>
) => {
  return useMutation<GetCategoryDto, ApiError, CreateCategoryDto>({
    mutationFn: async (categoryData) => {
      const formData = new FormData();
      Object.entries(categoryData).forEach(([key, value]) => {
        if (key === 'categoryImage' && value instanceof File) {
          formData.append('categoryImage', value);
        } else {
          formData.append(key, value.toString());
        }
      });

      return api.post('categories', { body: formData }).json<GetCategoryDto>();
    },
    ...options,
  });
};

export const useUpdateCategory = (
  categoryId: number,
  options?: UseMutationOptions<
    GetCategoryDto,
    ApiError,
    PartialUpdateCategoryDto
  >
) => {
  return useMutation<GetCategoryDto, ApiError, PartialUpdateCategoryDto>({
    mutationFn: async (categoryData) => {
      const formData = new FormData();
      Object.entries(categoryData).forEach(([key, value]) => {
        if (key === 'categoryImage' && value instanceof File) {
          formData.append('categoryImage', value);
        } else if (value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      return api
        .put(`categories/${categoryId}`, { body: formData })
        .json<GetCategoryDto>();
    },
    ...options,
  });
};

export const useDeleteCategory = (
  options?: UseMutationOptions<void, ApiError, number>
) => {
  return useMutation<void, ApiError, number>({
    mutationFn: async (categoryId: number) => {
      await api.delete(`categories/${categoryId}`).then((response) => {
        if (response.status !== 204) {
          throw new Error('Failed to delete category');
        }
      });
    },
    ...options,
  });
};
