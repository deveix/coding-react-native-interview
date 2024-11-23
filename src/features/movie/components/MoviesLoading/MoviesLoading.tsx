import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const MoviesLoading = () => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <View>
        {Array.from({length: 3}).map((_, index) => (
          <SkeletonPlaceholder.Item
            key={index}
            width="100%"
            height={300}
            borderRadius={12}
            marginBottom={16}
          />
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};
