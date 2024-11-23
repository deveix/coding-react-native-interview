import React, {useCallback} from 'react';
import {View, Text, FlatList} from 'react-native';

import {Movie} from '@/types/movie';
import {UpcomingMovieItem} from '@features/main/components';
import {useUpcoming} from '@features/main/hooks';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@/types/navigation';
import {SCREENS} from '@constants';
import {UpcomingMoviesLoading} from './Loading';

export const UpcomingMovies = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {upcomingMovies, isLoading} = useUpcoming();

  const handleMoviePress = useCallback(
    (movie: Movie) => {
      navigation.navigate(SCREENS.MOVIE.DETAIL, {
        movie,
      });
    },
    [navigation],
  );

  return (
    <View className="px-6 gap-y-3">
      <Text className="text-xl font-bold">Coming Soon</Text>
      {isLoading ? (
        <UpcomingMoviesLoading />
      ) : (
        <FlatList
          scrollEnabled={false}
          data={upcomingMovies}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <UpcomingMovieItem movie={item} onPress={handleMoviePress} />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};
