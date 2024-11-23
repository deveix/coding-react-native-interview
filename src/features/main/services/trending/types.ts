import {Movie} from '@/types/movie';

export interface TrendingResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export class TrendingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TrendingError';
  }
}
