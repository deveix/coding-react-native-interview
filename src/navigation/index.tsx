import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigation} from './AppNavigation';
import {useConfig} from '@hooks/useConfig';
import {SearchParamsProvider} from '@features/movie/context/SearchParamsContext';
import {Text, View} from 'react-native';
import {MovieDetailsProvider} from '@context/MovieDetailsContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export const RootNavigation = () => {
  const {configStatus} = useConfig();

  if (configStatus.isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (configStatus.isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Error: {configStatus?.error}</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView>
      <SearchParamsProvider>
        <MovieDetailsProvider>
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
        </MovieDetailsProvider>
      </SearchParamsProvider>
    </GestureHandlerRootView>
  );
};
