export type PaginationParams = {
  page: number;
  limit: number;
  skip: number;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PaginationResponseMeta = PaginationMeta & {
  next: string | null;
  previous: string | null;
};

export type PaginatedResult<T> = {
  data: T[];
  meta: PaginationMeta;
};

export function createPaginatedResult<T>(
  data: T[],
  total: number,
  pagination: PaginationParams,
): PaginatedResult<T> {
  const totalPages = Math.ceil(total / pagination.limit);

  return {
    data,
    meta: {
      page: pagination.page,
      limit: pagination.limit,
      total,
      totalPages,
    },
  };
}
