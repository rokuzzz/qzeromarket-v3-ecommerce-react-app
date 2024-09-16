export interface ApiError {
  status: string;
  detail: string;
}

export interface PaginationOptions {
  page?: number;
  perPage?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}
