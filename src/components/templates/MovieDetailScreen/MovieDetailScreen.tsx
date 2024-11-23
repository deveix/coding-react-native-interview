import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  Star,
  Calendar,
  Globe,
  Video,
  ArrowLeft,
  TrendingUp,
} from 'lucide-react-native';
import {DateTime} from 'luxon';
import Animated, {FadeIn} from 'react-native-reanimated';
import {GenreItem, InfoItem} from '@components';
import tw from '@lib/tailwind';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';
const {height} = Dimensions.get('window');

interface MovieDetailScreenProps
  extends StackScreenProps<RootStackParamList, 'MovieDetail'> {}

export const MovieDetailScreen: React.FC<MovieDetailScreenProps> = ({
  route: {
    params: {movie},
  },
}) => {
  const navigation = useNavigation();
  // if (!movie) {
  //   return null;
  // }

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Backdrop Image */}
        <Animated.View className="w-full" style={{height: height * 0.4}}>
          <FastImage
            source={{
              uri: movie.backdrop_url || movie.poster_url || '',
              priority: FastImage.priority.high,
            }}
            className="w-full h-full"
            resizeMode={FastImage.resizeMode.cover}>
            <View className="flex-1 px-6 py-5 justify-end bg-black/30">
              <Animated.View className="w-full">
                <Text className="text-3xl font-bold text-white mb-2">
                  {movie.title}
                </Text>
                <View className="flex-row flex-wrap">
                  {movie.genre_names.map(genre => (
                    <GenreItem key={genre} name={genre} dark />
                  ))}
                </View>
              </Animated.View>
            </View>
          </FastImage>
        </Animated.View>

        {/* Content */}
        <View className="px-6 pt-6">
          {/* Rating and Release */}
          <Animated.View
            entering={FadeIn.delay(200).duration(400)}
            className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center">
              <Star
                size={24}
                fill={tw.color('yellow-400')}
                color={tw.color('yellow-400')}
              />
              <Text className="ml-2 text-xl font-bold">
                {movie.vote_average.toFixed(1)}
              </Text>
              <Text className="text-gray-500 text-sm ml-1">
                ({movie.vote_count})
              </Text>
            </View>
            <Text className="text-gray-500">
              {DateTime.fromISO(movie.release_date).toFormat('MMM dd, yyyy')}
            </Text>
          </Animated.View>

          {/* Movie Info Grid */}
          <Animated.View
            entering={FadeIn.delay(300).duration(400)}
            className="flex-row flex-wrap justify-between mb-6">
            <InfoItem
              icon={<Calendar size={18} color={tw.color('gray-600')} />}
              label="Release Date"
              value={DateTime.fromISO(movie.release_date).toFormat(
                'MMM dd, yyyy',
              )}
            />
            <InfoItem
              icon={<TrendingUp size={18} color={tw.color('gray-600')} />}
              label="Popularity"
              value={`${Math.round(movie.popularity)}`}
            />
            <InfoItem
              icon={<Globe size={18} color={tw.color('gray-600')} />}
              label="Language"
              value={movie.original_language.toUpperCase()}
            />
            <InfoItem
              icon={<Video size={18} color={tw.color('gray-600')} />}
              label="Video"
              value={movie.video ? 'Available' : 'None'}
            />
          </Animated.View>

          {/* Overview */}
          <Animated.View
            entering={FadeIn.delay(400).duration(400)}
            className="mb-6">
            <Text className="text-xl font-bold mb-3">Overview</Text>
            <Text className="text-base text-gray-600 leading-6">
              {movie.overview}
            </Text>
          </Animated.View>
        </View>
      </ScrollView>

      {/* Back Button */}
      <Animated.View
        entering={FadeIn.delay(500).duration(400)}
        className="absolute top-12 left-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-10 h-10 bg-black/20 rounded-full items-center justify-center">
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
