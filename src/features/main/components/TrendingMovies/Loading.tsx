import React from 'react';
import {View, Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const ITEM_HEIGHT = SCREEN_WIDTH * 1.1;

export const TrendingMoviesLoading = () => {
  return (
    <View className="mt-3 px-6">
      <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder.Item
          width={SCREEN_WIDTH - 50}
          height={ITEM_HEIGHT}
          borderRadius={12}
        />
      </SkeletonPlaceholder>
    </View>
  );
};
