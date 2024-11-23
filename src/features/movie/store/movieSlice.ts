import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  searchMovies as searchMoviesService,
  MovieSearchParams,
} from '@features/movie/services';
import {Movie} from '@/types/movie';
import {MovieState} from '@features/movie/types/movie';
import {RootState} from '@/types/store';
import {getImageUrl} from '@utils/image';

const initialState: MovieState = {
  movies: [],
  status: {
    isLoading: false,
    isError: false,
    error: null,
  },
  currentPage: 1,
  totalPages: 0,
  totalResults: 0,
  searchParams: null,
};

export const searchMovies = createAsyncThunk(
  'movies/search',
  async (params: MovieSearchParams, {rejectWithValue, getState}) => {
    try {
      const response = await searchMoviesService(params);
      const state = getState() as RootState;
      const config = state.config.config;
      const genresMap = state.genre.genresMap;

      const moviesWithUrls: Movie[] = response.results.map(movie => ({
        ...movie,
        poster_url: getImageUrl(config, movie.poster_path, 'w500'),
        backdrop_url: getImageUrl(config, movie.backdrop_path, 'original'),
        genre_names: movie.genre_ids.map(id => genresMap[id] || 'Unknown'),
      }));

      return {
        ...response,
        results: moviesWithUrls,
      };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    resetMovies: state => {
      state.movies = [];
      state.currentPage = 1;
      state.totalPages = 0;
      state.totalResults = 0;
      state.searchParams = null;
    },
    resetMovieError: state => {
      state.status.isError = false;
      state.status.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(searchMovies.pending, state => {
        state.status.isLoading = true;
        state.status.isError = false;
        state.status.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status.isLoading = false;
        state.movies = action.payload.results;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
        state.totalResults = action.payload.total_results;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.status.isLoading = false;
        state.status.isError = true;
        state.status.error = action.payload as string;
      });
  },
});

export const {} = movieSlice.actions;

export const movieReducer = movieSlice.reducer;

// Selectors
export const selectMovies = (state: RootState) => state.movie.movies;
export const selectMovieStatus = (state: RootState) => state.movie.status;
export const selectIsMoviesLoading = (state: RootState) =>
  state.movie.status.isLoading;
export const selectMovieError = (state: RootState) => state.movie.status.error;
