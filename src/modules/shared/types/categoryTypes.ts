import { PaginationOptions } from './sharedTypes';

export interface GetCategoryDto {
  id: number;
  name: string;
  categoryImage: string;
  parentCategoryId: number | null;
}

export interface CreateCategoryDto {
  name: string;
  categoryImage: File;
  parentCategoryId?: number | null;
}

export interface CreateOrUpdateCategoryDto {
  name: string;
  categoryImage: File;
  parentCategoryId?: number | null;
}

export interface PartialUpdateCategoryDto {
  id: number;
  name?: string;
  categoryImage?: File;
  parentCategoryId: number | null;
}

export interface GetCategoriesParams extends PaginationOptions {
  categoryId?: number;
}
