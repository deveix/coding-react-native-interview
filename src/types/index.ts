export type LoadingStatus = {
  isLoading: boolean;
  isError: boolean;
  error: string | null;
};

export type PaginatedState<T> = {
  data: T[];
  status: LoadingStatus;
  currentPage: number;
  totalPages: number;
  totalResults: number;
};
