import React, {createContext, useContext, useState, ReactNode} from 'react';
import {Movie} from '@/types/movie';

interface MovieDetailsContextType {
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie | null) => void;
}

const MovieDetailsContext = createContext<MovieDetailsContextType | null>(null);

interface MovieDetailsProviderProps {
  children: ReactNode;
}

export const MovieDetailsProvider: React.FC<MovieDetailsProviderProps> = ({
  children,
}) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  return (
    <MovieDetailsContext.Provider
      value={{
        selectedMovie,
        setSelectedMovie,
      }}>
      {children}
    </MovieDetailsContext.Provider>
  );
};

export const useMovieDetails = () => {
  const context = useContext(MovieDetailsContext);
  if (context === null) {
    throw new Error(
      'useMovieDetails must be used within a MovieDetailsProvider',
    );
  }
  return context;
};
