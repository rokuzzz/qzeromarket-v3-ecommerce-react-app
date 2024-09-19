import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

import { api } from '../../shared/api/apiClient';
import { ApiError } from '../../shared/types/sharedTypes';
import {
  CreateOrderDto,
  GetOrderDto,
  GetAllOrdersResponse,
} from '../types/orderTypes';

export const useGetAllOrders = (
  params?: { page?: number; perPage?: number; userId?: number },
  options?: Omit<
    UseQueryOptions<GetAllOrdersResponse, ApiError>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<GetAllOrdersResponse, ApiError>({
    queryKey: ['getAllOrders', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.append('page', params.page.toString());
      if (params?.perPage)
        searchParams.append('perPage', params.perPage.toString());
      if (params?.userId)
        searchParams.append('userId', params.userId.toString());

      return api.get('orders', { searchParams }).json<GetAllOrdersResponse>();
    },
    ...options,
  });
};

export const useGetOrderById = (
  orderId: number | null,
  options?: Omit<
    UseQueryOptions<GetOrderDto, ApiError, GetOrderDto>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<GetOrderDto, ApiError>({
    queryKey: ['getOrderById', orderId],
    queryFn: async () => {
      if (orderId === null) {
        throw new Error('Order ID is null');
      }
      return api.get(`orders/${orderId}`).json<GetOrderDto>();
    },
    enabled: orderId !== null,
    ...options,
  });
};

export const useCreateOrder = (
  options?: UseMutationOptions<GetOrderDto, ApiError, CreateOrderDto>
) => {
  return useMutation<GetOrderDto, ApiError, CreateOrderDto>({
    mutationFn: async (orderData) => {
      return api.post('orders', { json: orderData }).json<GetOrderDto>();
    },
    ...options,
  });
};

export const useDeleteOrder = (
  options?: UseMutationOptions<void, ApiError, number>
) => {
  return useMutation<void, ApiError, number>({
    mutationFn: async (orderId: number) => {
      await api.delete(`orders/${orderId}`).then((response) => {
        if (response.status !== 204) {
          throw new Error('Failed to delete order');
        }
      });
    },
    ...options,
  });
};
