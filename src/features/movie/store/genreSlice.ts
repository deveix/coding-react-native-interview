import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchMovieGenres} from '@features/movie/services';
import {GenreState} from '@features/movie/types/genre';
import {RootState} from '@/types/store';

const initialState: GenreState = {
  genres: [],
  genresMap: {},
  status: {
    isLoading: false,
    isError: false,
    error: null,
  },
};

export const fetchGenres = createAsyncThunk(
  'genres/fetch',
  async (_, {rejectWithValue}) => {
    try {
      const genres = await fetchMovieGenres();
      return genres;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

const genreSlice = createSlice({
  name: 'genre',
  initialState,
  reducers: {
    resetGenreError: state => {
      state.status.isError = false;
      state.status.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGenres.pending, state => {
        state.status.isLoading = true;
        state.status.isError = false;
        state.status.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.status.isLoading = false;
        state.genres = action.payload;
        state.genresMap = action.payload.reduce(
          (acc: {[key: number]: string}, genre) => {
            acc[genre.id] = genre.name;
            return acc;
          },
          {},
        );
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.status.isLoading = false;
        state.status.isError = true;
        state.status.error = action.payload as string;
      });
  },
});

export const {resetGenreError} = genreSlice.actions;
export const genreReducer = genreSlice.reducer;

// Selectors
export const selectGenres = (state: RootState) => state.genre.genres;
export const selectGenreStatus = (state: RootState) => state.genre.status;
export const selectIsGenreLoading = (state: RootState) =>
  state.genre.status.isLoading;
export const selectGenreError = (state: RootState) => state.genre.status.error;
export const selectGenresMap = (state: RootState) => state.genre.genresMap;
