import {Genre} from '@features/movie/types/genre';

export interface GenreResponse {
  genres: Genre[];
}

export class GenreError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GenreError';
  }
}
