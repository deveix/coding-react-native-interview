import {Movie} from './movie';

export type RootStackParamList = {
  Drawer: undefined;
  MovieDetail: {
    movie: Movie;
  };
};

export type DrawerParamList = {
  Home: undefined;
  Movies: undefined;
};
