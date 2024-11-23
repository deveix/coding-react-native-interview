import {TMDBConfiguration} from '@features/main/types/config';

export interface ConfigurationResponse {
  data: TMDBConfiguration;
}

export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}
