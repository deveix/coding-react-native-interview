import React, {createContext, useContext, useState, ReactNode} from 'react';
import {MovieSearchParams} from '@features/movie/services';
import {SearchParamsContextType} from '@features/movie/types/movie';

const SearchParamsContext = createContext<SearchParamsContextType | null>(null);

interface SearchParamsProviderProps {
  children: ReactNode;
}

export const SearchParamsProvider: React.FC<SearchParamsProviderProps> = ({
  children,
}) => {
  const [searchParams, setSearchParams] = useState<MovieSearchParams>(null);

  const clearSearchParams = () => {
    setSearchParams(null);
  };

  return (
    <SearchParamsContext.Provider
      value={{
        searchParams,
        setSearchParams,
        clearSearchParams,
      }}>
      {children}
    </SearchParamsContext.Provider>
  );
};

export const useSearchParams = () => {
  const context = useContext(SearchParamsContext);
  if (context === null) {
    throw new Error(
      'useSearchParams must be used within a SearchParamsProvider',
    );
  }
  return context;
};
