import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const UpcomingMoviesLoading = () => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <View>
        {Array.from({length: 3}).map((_, index) => (
          <SkeletonPlaceholder.Item
            key={index}
            width="100%"
            height={120}
            borderRadius={8}
            marginBottom={16}
          />
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};
