import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '@redux/store';
import {
  selectTrendingMovies,
  selectTrendingStatus,
  fetchTrendingMovies,
} from '@features/main/store';
import {useEffect, useCallback} from 'react';

export const useTrending = () => {
  const dispatch = useDispatch<AppDispatch>();
  const trendingMovies = useSelector(selectTrendingMovies);
  const trendingStatus = useSelector(selectTrendingStatus);

  useEffect(() => {
    dispatch(fetchTrendingMovies());
  }, [dispatch]);

  const retryFetch = useCallback(() => {
    dispatch(fetchTrendingMovies());
  }, [dispatch]);

  return {
    trendingMovies,
    isLoading: trendingStatus.isLoading,
    error: trendingStatus.error,
    retryFetch,
  };
};
