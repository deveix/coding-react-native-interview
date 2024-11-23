import React, {FC} from 'react';
import {Dimensions} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

import {Movie} from '@/types/movie';
import {MovieItem} from '@components/organisms';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const ITEM_WIDTH = SCREEN_WIDTH * 0.75;
const ITEM_HEIGHT = ITEM_WIDTH * 1.5;
const EMPTY_SPACE_WIDTH = (SCREEN_WIDTH - ITEM_WIDTH) / 2;

interface CarouselItemProps {
  item: Movie;
  animationValue: Animated.SharedValue<number>;
  handleMoviePress: (movie: Movie) => void;
}
export const CarouselItem: FC<CarouselItemProps> = ({
  item,
  animationValue,
  handleMoviePress,
}) => {
  const animStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [0.85, 1, 0.85],
    );

    const opacity = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [0.6, 1, 0.6],
    );

    return {
      transform: [{scale}],
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        {width: ITEM_WIDTH, marginLeft: EMPTY_SPACE_WIDTH + 10},
        animStyle,
      ]}
      className="items-center">
      <MovieItem
        movie={item}
        onPress={() => handleMoviePress(item)}
        variant="poster"
        style={{
          height: ITEM_HEIGHT,
          width: ITEM_WIDTH - 20,
        }}
      />
    </Animated.View>
  );
};
