import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchTrendingMovies as fetchTrendingMoviesService} from '@features/main/services';
import {TrendingState} from '@features/main/types/trending';
import {RootState} from '@/types/store';
import {getImageUrl} from '@utils/image';
import {Movie} from '@/types/movie';

const initialState: TrendingState = {
  data: [],
  status: {
    isLoading: false,
    isError: false,
    error: null,
  },
  currentPage: 1,
  totalPages: 0,
  totalResults: 0,
};

export const fetchTrendingMovies = createAsyncThunk(
  'trending/fetch',
  async (_, {rejectWithValue, getState}) => {
    try {
      const response = await fetchTrendingMoviesService();
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

const trendingSlice = createSlice({
  name: 'trending',
  initialState,
  reducers: {
    resetMovies: state => {
      state.data = [];
      state.currentPage = 1;
      state.totalPages = 0;
      state.totalResults = 0;
    },
    resetMovieError: state => {
      state.status.isError = false;
      state.status.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTrendingMovies.pending, state => {
        state.status.isLoading = true;
        state.status.isError = false;
        state.status.error = null;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.status.isLoading = false;
        state.data = action.payload.results;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
        state.totalResults = action.payload.total_results;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.status.isLoading = false;
        state.status.isError = true;
        state.status.error = action.payload as string;
      });
  },
});

export const {} = trendingSlice.actions;

export const trendingReducer = trendingSlice.reducer;

// Selectors
export const selectTrendingMovies = (state: RootState) => state.trending.data;
export const selectTrendingStatus = (state: RootState) => state.trending.status;
export const selectIsTrendingLoading = (state: RootState) =>
  state.trending.status.isLoading;
export const selectTrendingError = (state: RootState) =>
  state.trending.status.error;
