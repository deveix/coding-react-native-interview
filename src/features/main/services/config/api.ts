import {apiClient} from '@/api';
import {ConfigurationResponse, ConfigurationError} from './types';
import axios from 'axios';

export const fetchConfiguration = async (): Promise<
  ConfigurationResponse['data']
> => {
  try {
    const response = await apiClient.get<ConfigurationResponse['data']>(
      '/configuration',
    );

    if (!response.data.images) {
      throw new ConfigurationError('Invalid configuration response');
    }

    return response.data;
  } catch (error) {
    if (error instanceof ConfigurationError) {
      throw error;
    }
    if (axios.isAxiosError(error)) {
      throw new ConfigurationError(
        error.response?.data?.status_message || 'Failed to fetch configuration',
      );
    }
    throw new ConfigurationError('An unexpected error occurred');
  }
};
