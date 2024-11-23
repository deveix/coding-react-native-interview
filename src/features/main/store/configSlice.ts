import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchConfiguration} from '@features/main/services';
import {ConfigState} from '@features/main/types/config';
import {RootState} from '@/types/store';

const initialState: ConfigState = {
  config: null,
  status: {
    isLoading: false,
    isError: false,
    error: null,
  },
};

export const fetchConfig = createAsyncThunk(
  'config/fetchConfig',
  async (_, {rejectWithValue}) => {
    try {
      const data = await fetchConfiguration();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  },
);

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    resetConfigError: state => {
      state.status.isError = false;
      state.status.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchConfig.pending, state => {
        state.status = {isLoading: true, isError: false, error: null};
      })
      .addCase(fetchConfig.fulfilled, (state, action) => {
        state.status = {isLoading: false, isError: false, error: null};
        state.config = action.payload;
      })
      .addCase(fetchConfig.rejected, (state, action) => {
        state.status = {isLoading: false, isError: true, error: null};
        state.status.error =
          (action.payload as string) ?? 'An unexpected error occurred';
      });
  },
});

export const {resetConfigError} = configSlice.actions;
export const configReducer = configSlice.reducer;

// Selectors
export const selectConfig = (state: RootState) => state.config.config;
export const selectConfigStatus = (state: RootState) => state.config.status;
export const selectIsConfigLoading = (state: RootState) =>
  state.config.status.isLoading;
export const selectConfigError = (state: RootState) =>
  state.config.status.error;
