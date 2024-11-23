import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchUpcomingMovies as fetchUpcomingMoviesService} from '@features/main/services';
import {UpcomingState} from '@features/main/types/upcoming';
import {RootState} from '@/types/store';
import {getImageUrl} from '@utils/image';
import {Movie} from '@/types/movie';

const initialState: UpcomingState = {
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

export const fetchUpcomingMovies = createAsyncThunk(
  'upcoming/fetch',
  async (_, {rejectWithValue, getState}) => {
    try {
      const response = await fetchUpcomingMoviesService();
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

const upcomingSlice = createSlice({
  name: 'upcoming',
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
      .addCase(fetchUpcomingMovies.pending, state => {
        state.status.isLoading = true;
        state.status.isError = false;
        state.status.error = null;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.status.isLoading = false;
        state.data = action.payload.results;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
        state.totalResults = action.payload.total_results;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.status.isLoading = false;
        state.status.isError = true;
        state.status.error = action.payload as string;
      });
  },
});

export const {} = upcomingSlice.actions;

export const upcomingReducer = upcomingSlice.reducer;

// Selectors
export const selectUpcomingMovies = (state: RootState) => state.upcoming.data;
export const selectUpcomingStatus = (state: RootState) => state.upcoming.status;
export const selectIsUpcomingLoading = (state: RootState) =>
  state.upcoming.status.isLoading;
export const selectUpcomingError = (state: RootState) =>
  state.upcoming.status.error;
