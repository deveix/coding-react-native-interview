import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import {reduxStorage} from './storage';

// Slices
import {movieReducer, genreReducer} from '@features/movie/store';
import {
  configReducer,
  trendingReducer,
  upcomingReducer,
} from '@features/main/store';

const rootReducer = combineReducers({
  movie: movieReducer,
  trending: trendingReducer,
  upcoming: upcomingReducer,
  genre: genreReducer,
  config: configReducer,
});

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({immutableCheck: false, serializableCheck: false}),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
