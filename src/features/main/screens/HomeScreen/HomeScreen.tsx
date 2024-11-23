import React from 'react';
import {LayoutWrapper} from '@components';
import {TrendingMovies, UpcomingMovies} from '@features/main/components';

export function HomeScreen() {
  return (
    <LayoutWrapper title="Discover" className="px-0">
      <TrendingMovies />
      <UpcomingMovies />
    </LayoutWrapper>
  );
}
