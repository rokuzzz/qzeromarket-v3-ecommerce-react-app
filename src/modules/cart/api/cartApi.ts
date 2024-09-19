import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

import { api } from '../../shared/api/apiClient';
import { PaginatedResult, ApiError } from '../../shared/types/sharedTypes';
import {
  GetCartItemDto,
  CreateCartItemDto,
  UpdateCartItemDto,
  GetCartItemsParams,
} from '../types/cartTypes';

export const useGetAllCartItems = (
  params: GetCartItemsParams,
  options?: Omit<
    UseQueryOptions<PaginatedResult<GetCartItemDto>, ApiError>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<PaginatedResult<GetCartItemDto>, ApiError>({
    queryKey: ['getAllCartItems', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params.page) searchParams.append('page', params.page.toString());
      if (params.perPage)
        searchParams.append('perPage', params.perPage.toString());
      searchParams.append('userId', params.userId.toString());

      return api
        .get('cart-items', { searchParams })
        .json<PaginatedResult<GetCartItemDto>>();
    },
    ...options,
  });
};

export const useGetCartItemById = (
  cartItemId: number | null,
  options?: Omit<
    UseQueryOptions<GetCartItemDto, ApiError, GetCartItemDto>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<GetCartItemDto, ApiError>({
    queryKey: ['getCartItemById', cartItemId],
    queryFn: async () => {
      if (cartItemId === null) {
        throw new Error('Cart Item ID is null');
      }
      return api.get(`cart-items/${cartItemId}`).json<GetCartItemDto>();
    },
    enabled: cartItemId !== null,
    ...options,
  });
};

export const useCreateCartItem = (
  options?: UseMutationOptions<GetCartItemDto, ApiError, CreateCartItemDto>
) => {
  return useMutation<GetCartItemDto, ApiError, CreateCartItemDto>({
    mutationFn: async (cartItemData) => {
      return api
        .post('cart-items', { json: cartItemData })
        .json<GetCartItemDto>();
    },
    ...options,
  });
};

export const useUpdateCartItem = (
  options?: UseMutationOptions<
    GetCartItemDto,
    ApiError,
    { cartItemId: number; data: UpdateCartItemDto }
  >
) => {
  return useMutation<
    GetCartItemDto,
    ApiError,
    { cartItemId: number; data: UpdateCartItemDto }
  >({
    mutationFn: async ({ cartItemId, data }) => {
      return api
        .patch(`cart-items/${cartItemId}`, { json: data })
        .json<GetCartItemDto>();
    },
    ...options,
  });
};

export const useDeleteCartItem = (
  options?: UseMutationOptions<void, ApiError, number>
) => {
  return useMutation<void, ApiError, number>({
    mutationFn: async (cartItemId: number) => {
      await api.delete(`cart-items/${cartItemId}`).then((response) => {
        if (response.status !== 204) {
          throw new Error('Failed to delete cart item');
        }
      });
    },
    ...options,
  });
};
