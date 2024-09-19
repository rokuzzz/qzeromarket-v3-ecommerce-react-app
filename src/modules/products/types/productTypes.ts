import { BaseDto, PaginationOptions } from '../../shared/types/sharedTypes';

export interface GetProductDto extends BaseDto {
  title: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  productImage: { url: string }[];
}

export interface CreateProductDto extends BaseDto {
  title: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  productImages?: File[];
}

export interface UpdateProductDto extends BaseDto {
  title?: string;
  description?: string;
  price?: number;
  stock?: number;
  categoryId?: number;
  productImages?: File[];
}

export interface GetProductsParams extends PaginationOptions {
  categoryId?: number;
}
