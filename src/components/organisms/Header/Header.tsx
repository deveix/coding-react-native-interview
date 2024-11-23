import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ArrowLeft, Menu} from 'lucide-react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
}) => {
  const navigation = useNavigation();
  const _back = () => navigation.goBack();
  const _openDrawer = () => navigation.dispatch(DrawerActions.openDrawer());

  return (
    <View className={'flex-row items-center justify-between px-4 py-4'}>
      <View className="w-12">
        {showBackButton ? (
          <TouchableOpacity onPress={_back} className="p-2">
            <ArrowLeft size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={_openDrawer} className="p-2">
            <Menu size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <View className="flex-1 items-center">
        <Text className="text-black text-lg font-semibold">{title}</Text>
        <View className="h-[3px] w-12 bg-orange-500 mt-1" />
      </View>
      <View className="w-12" />
    </View>
  );
};
