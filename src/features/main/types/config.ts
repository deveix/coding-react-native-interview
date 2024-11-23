import {LoadingStatus} from '@/types';

export interface ImageConfiguration {
  base_url: string;
  secure_base_url: string;
  backdrop_sizes: string[];
  logo_sizes: string[];
  poster_sizes: string[];
  profile_sizes: string[];
  still_sizes: string[];
}

export interface TMDBConfiguration {
  images: ImageConfiguration;
  change_keys: string[];
}

// store
export interface ConfigState {
  config: TMDBConfiguration | null;
  status: LoadingStatus;
}
