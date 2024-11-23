import {apiClient} from '@/api';
import {UpcomingResponse, UpcomingError} from './types';
import axios from 'axios';

export const fetchUpcomingMovies = async (): Promise<UpcomingResponse> => {
  try {
    const response = await apiClient.get<UpcomingResponse>('movie/upcoming');

    if (!response.data) {
      throw new UpcomingError('Invalid upcoming response');
    }

    return response.data;
  } catch (error) {
    if (error instanceof UpcomingError) {
      throw error;
    }
    if (axios.isAxiosError(error)) {
      throw new UpcomingError(
        error.response?.data?.status_message || 'Failed to fetch upcoming',
      );
    }
    throw new UpcomingError('An unexpected error occurred');
  }
};
