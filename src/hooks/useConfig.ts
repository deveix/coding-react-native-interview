import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '@redux/store';
import {
  selectConfig,
  selectConfigStatus,
  fetchConfig,
} from '@features/main/store/configSlice';
import {useEffect, useCallback} from 'react';

export const useConfig = () => {
  const dispatch = useDispatch<AppDispatch>();
  const config = useSelector(selectConfig);
  const configStatus = useSelector(selectConfigStatus);

  useEffect(() => {
    if (!config && !configStatus.isLoading) {
      dispatch(fetchConfig());
    }
  }, [dispatch, config, configStatus.isLoading]);

  const retryFetch = useCallback(() => {
    dispatch(fetchConfig());
  }, [dispatch]);

  return {
    config,
    configStatus,
    retryFetch,
  };
};
