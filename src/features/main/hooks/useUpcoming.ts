import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '@redux/store';
import {
  selectUpcomingMovies,
  selectUpcomingStatus,
  fetchUpcomingMovies,
} from '@features/main/store';
import {useEffect, useCallback} from 'react';

export const useUpcoming = () => {
  const dispatch = useDispatch<AppDispatch>();
  const upcomingMovies = useSelector(selectUpcomingMovies);
  const upcomingStatus = useSelector(selectUpcomingStatus);

  useEffect(() => {
    dispatch(fetchUpcomingMovies());
  }, [dispatch]);

  const retryFetch = useCallback(() => {
    dispatch(fetchUpcomingMovies());
  }, [dispatch]);

  return {
    upcomingMovies,
    isLoading: upcomingStatus.isLoading,
    error: upcomingStatus.error,
    retryFetch,
  };
};
