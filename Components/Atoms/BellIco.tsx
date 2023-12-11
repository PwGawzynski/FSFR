import { Text, View } from 'react-native';
import React from 'react';
import BellSvg from '../../assets/bell.svg';

export function BellIco() {
  return (
    <View testID="BellIco" className="items-end">
      <BellSvg fill="#000" width={40} height={40} />
      <View className="w-4 h-4 relative top-[-16] right-8 bg-red-600 rounded-full">
        <Text className="text-white text-center">1</Text>
      </View>
    </View>
  );
}
