import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '@redux/store';
import {
  selectGenres,
  selectGenresMap,
  selectGenreStatus,
  fetchGenres,
} from '@features/movie/store';
import {useEffect, useCallback} from 'react';

export const useGenres = () => {
  const dispatch = useDispatch<AppDispatch>();
  const genres = useSelector(selectGenres);
  const genresMap = useSelector(selectGenresMap);
  const genreStatus = useSelector(selectGenreStatus);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const retryFetch = useCallback(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  return {
    genres,
    genresMap,
    isLoading: genreStatus.isLoading,
    error: genreStatus.error,
    retryFetch,
  };
};
