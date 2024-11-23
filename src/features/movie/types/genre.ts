import {LoadingStatus} from '@/types';

export interface Genre {
  id: number;
  name: string;
}

// store
export type GenreMap = {[key: number]: string};

export interface GenreState {
  genres: Genre[];
  genresMap: GenreMap;
  status: LoadingStatus;
}
