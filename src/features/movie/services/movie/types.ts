import {Movie} from '@/types/movie';

export type MovieSearchParams = {
  query: string;
  page?: number;
  include_adult?: boolean;
  language?: string;
  primary_release_year?: number;
  region?: string;
  year?: number;
} | null;

export interface MovieSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export class MovieError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MovieError';
  }
}
