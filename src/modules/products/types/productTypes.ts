import { PaginationOptions } from '../../shared/types/sharedTypes';

export interface GetProductDto {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  productImage: { url: string }[];
}

export interface CreateProductDto {
  title: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  productImages?: File[];
}

export interface UpdateProductDto {
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
