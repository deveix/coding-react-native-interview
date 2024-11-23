import {apiClient} from '@/api';
import {MovieSearchResponse, MovieError, MovieSearchParams} from './types';
import axios from 'axios';

export const searchMovies = async (
  params: MovieSearchParams,
): Promise<MovieSearchResponse> => {
  try {
    const response = await apiClient.get<MovieSearchResponse>(
      !params || !params.query ? 'discover/movie' : '/search/movie',
      {
        params,
      },
    );

    if (!response.data) {
      throw new MovieError('Invalid movies search response');
    }

    return response.data;
  } catch (error) {
    if (error instanceof MovieError) {
      throw error;
    }
    if (axios.isAxiosError(error)) {
      throw new MovieError(
        error.response?.data?.status_message || 'Failed to fetch movies search',
      );
    }
    throw new MovieError('An unexpected error occurred');
  }
};
