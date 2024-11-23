import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {AppDispatch} from '@redux/store';
import {
  selectMovies,
  selectIsMoviesLoading,
  selectMovieError,
  searchMovies,
} from '@features/movie/store/movieSlice';
import {useSearchParams} from '@features/movie/context/SearchParamsContext';

export const useMovies = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {searchParams, setSearchParams} = useSearchParams();
  const movies = useSelector(selectMovies);
  const isLoading = useSelector(selectIsMoviesLoading);
  const error = useSelector(selectMovieError);

  const searchMoviesHandler = useCallback(() => {
    return dispatch(searchMovies(searchParams));
  }, [dispatch, searchParams]);
  useEffect(() => {
    searchMoviesHandler();
  }, [searchMoviesHandler, searchParams]);

  return {
    movies,
    isLoading,
    error,
    searchMovies: searchMoviesHandler,
    currentSearchParams: searchParams,
    setSearchParams,
  };
};
