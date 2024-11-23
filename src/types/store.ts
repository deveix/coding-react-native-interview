import {ConfigState} from '@/features/main/types/config';
import {GenreState} from '@/features/movie/types/genre';
import {MovieState} from '@/features/movie/types/movie';
import {TrendingState} from '@features/main/types/trending';
import {UpcomingState} from '@features/main/types/upcoming';

export interface RootState {
  config: ConfigState;
  trending: TrendingState;
  upcoming: UpcomingState;
  genre: GenreState;
  movie: MovieState;
}
