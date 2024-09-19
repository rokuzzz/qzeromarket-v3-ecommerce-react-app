import { BaseDto, PaginationOptions } from '../../shared/types/sharedTypes';

export interface CreateCartItemDto {
  productId: number;
  userId: number;
  quantity: number;
}

export interface GetCartItemsParams extends PaginationOptions {
  userId: number;
}

export interface GetCartItemDto extends BaseDto {
  quantity: number;
  userId: number;
  productId: number;
}

export interface UpdateCartItemDto {
  quantity: number;
}
