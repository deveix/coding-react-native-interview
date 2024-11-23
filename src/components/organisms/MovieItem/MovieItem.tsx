import React, {memo} from 'react';
import {TouchableOpacity, Text, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Star} from 'lucide-react-native';
import {DateTime} from 'luxon';
import Animated from 'react-native-reanimated';

import {Movie} from '@/types/movie';
import {GenreItem} from '@components/molecules';
import tw from '@lib/tailwind';

interface MovieItemProps {
  movie: Movie;
  onPress: () => void;
  variant?: 'default' | 'poster';
  style?: ViewStyle;
}

export const MovieItem = memo(
  ({movie, onPress, variant = 'default', style}: MovieItemProps) => {
    const isPoster = variant === 'poster';

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        className={
          isPoster
            ? 'rounded-xl overflow-hidden'
            : 'w-full h-[300px] rounded-xl overflow-hidden'
        }
        style={style}
        onPress={onPress}>
        <Animated.View
          sharedTransitionTag={`movie.${movie.id}.backdrop`}
          className="w-full h-full">
          <FastImage
            source={{
              uri: isPoster
                ? movie.poster_url || movie.backdrop_url || ''
                : movie.backdrop_url || movie.poster_url || '',
              priority: FastImage.priority.normal,
              cache: FastImage.cacheControl.immutable,
            }}
            className="w-full h-full rounded-lg"
            resizeMode={FastImage.resizeMode.cover}>
            <View
              className={
                'flex-1 px-4 py-3 justify-end bottom-0 top-0 left-0 right-0 bg-black/50'
              }>
              <Animated.View
                sharedTransitionTag={`movie.${movie.id}.content`}
                className="w-full">
                <Text
                  className={`${
                    isPoster ? 'text-lg' : 'text-xl'
                  } font-bold text-white mb-1`}
                  numberOfLines={2}>
                  {movie.title}
                </Text>

                {!isPoster && (
                  <View className="flex-row flex-wrap">
                    {movie.genre_names.map(genre => (
                      <GenreItem key={genre} name={genre} dark />
                    ))}
                  </View>
                )}

                <View className="flex-row justify-between items-center mt-2">
                  {!isPoster && (
                    <Text className="text-white text-sm">
                      {DateTime.fromISO(movie.release_date).toRelative()}
                    </Text>
                  )}

                  <View className="flex-row items-center gap-x-1">
                    <Star
                      size={isPoster ? 14 : 16}
                      fill={tw.color('yellow-400')}
                      className="text-yellow-400"
                    />
                    <Text className="text-gray-300 font-bold text-base">
                      {movie.vote_average.toFixed(1)}
                    </Text>
                  </View>
                </View>
              </Animated.View>
            </View>
          </FastImage>
        </Animated.View>
      </TouchableOpacity>
    );
  },
);
