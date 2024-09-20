import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

import { api } from '../../shared/api/apiClient';
import { PaginatedResult, ApiError } from '../../shared/types/sharedTypes';
import {
  GetProductDto,
  CreateProductDto,
  UpdateProductDto,
  GetProductsParams,
} from '../types/productTypes';

export const useGetAllProducts = (
  params?: GetProductsParams,
  options?: Omit<
    UseQueryOptions<PaginatedResult<GetProductDto>, ApiError>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<PaginatedResult<GetProductDto>, ApiError>({
    queryKey: ['getAllProducts', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.append('page', params.page.toString());
      if (params?.perPage)
        searchParams.append('perPage', params.perPage.toString());
      if (params?.categoryId)
        searchParams.append('categoryId', params.categoryId.toString());

      return api
        .get('products', { searchParams })
        .json<PaginatedResult<GetProductDto>>();
    },
    ...options,
  });
};

export const useGetProductById = (
  productId: number | null,
  options?: Omit<
    UseQueryOptions<GetProductDto, ApiError, GetProductDto>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<GetProductDto, ApiError>({
    queryKey: ['getProductById', productId],
    queryFn: async () => {
      if (productId === null) {
        throw new Error('Product ID is null');
      }
      return api.get(`products/${productId}`).json<GetProductDto>();
    },
    enabled: productId !== null,
    ...options,
  });
};

// In productApi.ts
export const getProductsByIds = async (
  productIds: number[]
): Promise<GetProductDto[]> => {
  const searchParams = new URLSearchParams();
  productIds.forEach((id) => searchParams.append('ids', id.toString()));
  return api.get('products/by-ids', { searchParams }).json<GetProductDto[]>();
};

export const useGetProductsByIds = (
  productIds: number[],
  options?: Omit<
    UseQueryOptions<GetProductDto[], ApiError, GetProductDto[]>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<GetProductDto[], ApiError>({
    queryKey: ['getProductsByIds', productIds],
    queryFn: () => getProductsByIds(productIds),
    enabled: productIds.length > 0,
    ...options,
  });
};

export const useCreateProduct = (
  options?: UseMutationOptions<GetProductDto, ApiError, CreateProductDto>
) => {
  return useMutation<GetProductDto, ApiError, CreateProductDto>({
    mutationFn: async (productData) => {
      const formData = new FormData();
      Object.entries(productData).forEach(([key, value]) => {
        if (key === 'productImages' && Array.isArray(value)) {
          value.forEach((file) => formData.append('productImages', file));
        } else {
          formData.append(key, value.toString());
        }
      });

      return api.post('products', { body: formData }).json<GetProductDto>();
    },
    ...options,
  });
};

export const useUpdateProduct = (
  productId: number,
  options?: UseMutationOptions<GetProductDto, ApiError, UpdateProductDto>
) => {
  return useMutation<GetProductDto, ApiError, UpdateProductDto>({
    mutationFn: async (productData) => {
      const formData = new FormData();
      Object.entries(productData).forEach(([key, value]) => {
        if (key === 'productImages' && Array.isArray(value)) {
          value.forEach((file) => formData.append('productImages', file));
        } else if (value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      return api
        .put(`products/${productId}`, { body: formData })
        .json<GetProductDto>();
    },
    ...options,
  });
};

export const useDeleteProduct = (
  options?: UseMutationOptions<void, ApiError, number>
) => {
  return useMutation<void, ApiError, number>({
    mutationFn: async (productId: number) => {
      await api.delete(`products/${productId}`).then((response) => {
        if (response.status !== 204) {
          throw new Error('Failed to delete product');
        }
      });
    },
    ...options,
  });
};
