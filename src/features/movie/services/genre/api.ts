import {apiClient} from '@/api';
import {GenreResponse, GenreError} from './types';
import axios from 'axios';

export const fetchMovieGenres = async (): Promise<GenreResponse['genres']> => {
  try {
    const response = await apiClient.get<GenreResponse>('/genre/movie/list');

    if (!response.data.genres) {
      throw new GenreError('Invalid genre response');
    }

    return response.data.genres;
  } catch (error) {
    if (error instanceof GenreError) {
      throw error;
    }
    if (axios.isAxiosError(error)) {
      throw new GenreError(
        error.response?.data?.status_message || 'Failed to fetch genre',
      );
    }
    throw new GenreError('An unexpected error occurred');
  }
};
