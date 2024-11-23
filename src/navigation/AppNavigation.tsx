import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import {HomeScreen} from '@features/main/screens';
import {MoviesListScreen} from '@features/movie/screens';
import {SCREENS} from '@constants';
import {createComponentForStaticNavigation} from '@react-navigation/native';
import {Home, Film} from 'lucide-react-native';
import {MovieDetailScreen} from '@components';

const DrawerNavigation = createDrawerNavigator({
  screenOptions: {
    headerShown: false,
    drawerActiveTintColor: '#f4511e',
    drawerInactiveTintColor: '#1f2937',
  },
  screens: {
    [SCREENS.DRAWER.HOME]: {
      screen: HomeScreen,
      options: {
        drawerIcon: ({color}) => <Home size={24} color={color} />,
      },
    },
    [SCREENS.DRAWER.MOVIES]: {
      screen: MoviesListScreen,
      options: {
        drawerIcon: ({color}) => <Film size={24} color={color} />,
      },
    },
  },
});

const RootStack = createStackNavigator({
  screenOptions: {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerShown: false,
  },
  screens: {
    [SCREENS.DRAWER.MAIN]: {
      screen: DrawerNavigation,
    },
    [SCREENS.MOVIE.DETAIL]: {
      screen: MovieDetailScreen,
      options: {
        animation: 'fade',
        presentation: 'transparentModal',
        headerShown: false,
      },
    },
  },
});

export const AppNavigation = createComponentForStaticNavigation(
  RootStack,
  'RootNavigator',
);
