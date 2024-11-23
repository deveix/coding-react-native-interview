import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Calendar, Star} from 'lucide-react-native';

import {Movie} from '@/types/movie';
import {formatDate} from '@utils';
import tw from '@lib/tailwind';

interface UpcomingMovieItemProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
}

export const UpcomingMovieItem: React.FC<UpcomingMovieItemProps> = ({
  movie,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(movie)}
      className="active:opacity-70">
      <View className="bg-white rounded-xl p-5 mb-4 shadow-sm border border-gray-100">
        <Text className="font-bold text-lg mb-3 text-gray-800">
          {movie.title}
        </Text>

        <View className="space-y-2">
          <View className="flex-row items-center">
            <Calendar className="w-4 h-4 text-gray-400 mr-2.5" />
            <Text className="text-gray-500 text-sm">
              Release: {formatDate(movie.release_date)}
            </Text>
          </View>

          <View className="flex-row items-center">
            <Star
              className="w-4 h-4 text-yellow-400 mr-2.5"
              fill={tw.color('yellow-400')}
            />
            <Text className="text-gray-500 text-sm">
              {movie.vote_count.toLocaleString()} votes
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
