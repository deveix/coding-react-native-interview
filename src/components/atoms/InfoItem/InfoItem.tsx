import React from 'react';
import {View, Text} from 'react-native';

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export const InfoItem = ({icon, label, value}: InfoItemProps) => (
  <View className="w-[45%] mb-4">
    <View className="flex-row items-center mb-1">
      {icon}
      <Text className="text-sm text-gray-600 ml-1">{label}</Text>
    </View>
    <Text className="text-base font-semibold text-gray-900">{value}</Text>
  </View>
);
