import React from 'react';
import {Header} from '@components';
import {ScrollView, StyleProp, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface LayoutWrapperProps {
  title: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  showBackButton?: boolean;
  className?: string;
}

export const LayoutWrapper: React.FC<LayoutWrapperProps> = ({
  title,
  children,
  showBackButton,
  style,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View className="bg-gray-100 flex-1" style={{paddingTop: insets.top}}>
      <Header title={title} showBackButton={showBackButton} />
      <ScrollView className="flex-1 pt-4 px-6" style={style}>
        {children}
      </ScrollView>
    </View>
  );
};
