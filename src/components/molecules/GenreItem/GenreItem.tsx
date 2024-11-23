import React, {memo} from 'react';
import {View, Text} from 'react-native';

interface GenreItemProps {
  name: string;
  dark?: boolean;
}

export const GenreItem: React.FC<GenreItemProps> = memo(({name}) => {
  return (
    <View
      className={
        'px-2 py-1 rounded-md justify-center mr-2 mb-2 bg-gray-700/70 border border-gray-600'
      }>
      <Text className={`text-xs ${'text-gray-300'}`}>{name}</Text>
    </View>
  );
});
