export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type Paginated<T> = {
  data: T[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
  };
};

export function paginateArray<T>(
  items: T[],
  params?: PaginationParams,
): Paginated<T> {
  const currentPage = Math.max(1, Number(params?.page ?? 1));
  const itemsPerPage = Math.min(100, Math.max(1, Number(params?.limit ?? 10)));
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const data = items.slice(start, end);

  return {
    data,
    meta: {
      itemsPerPage,
      totalItems,
      currentPage,
      totalPages,
    },
  };
}
