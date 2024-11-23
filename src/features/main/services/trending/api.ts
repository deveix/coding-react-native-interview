import {apiClient} from '@/api';
import {TrendingResponse, TrendingError} from './types';
import axios from 'axios';

export const fetchTrendingMovies = async (): Promise<TrendingResponse> => {
  try {
    const response = await apiClient.get<TrendingResponse>('movie/popular');

    if (!response.data) {
      throw new TrendingError('Invalid trending response');
    }

    return response.data;
  } catch (error) {
    if (error instanceof TrendingError) {
      throw error;
    }
    if (axios.isAxiosError(error)) {
      throw new TrendingError(
        error.response?.data?.status_message || 'Failed to fetch trending',
      );
    }
    throw new TrendingError('An unexpected error occurred');
  }
};
