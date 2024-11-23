import {Movie} from '@/types/movie';

export interface UpcomingResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export class UpcomingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UpcomingError';
  }
}
