import React, {useCallback} from 'react';
import {View, Text, Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Animated from 'react-native-reanimated';

import {Movie} from '@/types/movie';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@/types/navigation';
import {SCREENS} from '@constants';
import {CarouselItem} from '@features/main/components';
import {TrendingMoviesLoading} from './Loading';
import {useTrending} from '@features/main/hooks';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const ITEM_WIDTH = SCREEN_WIDTH * 0.7;
const ITEM_HEIGHT = ITEM_WIDTH * 1.5;

export const TrendingMovies = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {trendingMovies, isLoading} = useTrending();

  const handleMoviePress = useCallback(
    (movie: Movie) => {
      navigation.navigate(SCREENS.MOVIE.DETAIL, {
        movie,
      });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({
      item,
      animationValue,
    }: {
      item: Movie;
      animationValue: Animated.SharedValue<number>;
    }) => {
      return (
        <CarouselItem
          item={item}
          animationValue={animationValue}
          handleMoviePress={handleMoviePress}
        />
      );
    },
    [handleMoviePress],
  );

  return (
    <View className="mb-6">
      <Text className="text-xl font-bold ml-6">Trending Now</Text>
      {isLoading ? (
        <TrendingMoviesLoading />
      ) : (
        <Carousel
          loop
          width={ITEM_WIDTH}
          height={ITEM_HEIGHT}
          data={trendingMovies}
          renderItem={renderItem}
          defaultIndex={1}
          style={{width: SCREEN_WIDTH}}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.85,
            parallaxScrollingOffset: 35,
            parallaxAdjacentItemScale: 0.85,
          }}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          scrollAnimationDuration={1000}
          snapEnabled={true}
          windowSize={3}
          autoFillData={false}
        />
      )}
    </View>
  );
};
