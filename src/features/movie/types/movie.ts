import {LoadingStatus} from '@/types';
import {MovieSearchParams} from '@features/movie/services';
import {Movie} from '@/types/movie';

// store
export interface MovieState {
  movies: Movie[];
  status: LoadingStatus;
  currentPage: number;
  totalPages: number;
  totalResults: number;
  searchParams: MovieSearchParams;
}

// context
export interface SearchParamsContextType {
  searchParams: MovieSearchParams;
  setSearchParams: (params: MovieSearchParams) => void;
  clearSearchParams: () => void;
}
