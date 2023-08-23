import { View } from 'react-native';
import React from 'react';
import { ScreenTitleHeader } from '../Atoms/ScreenTitleHeader';
import { BellIco } from '../Atoms/BellIco';

export function DesktopRootHeader() {
  return (
    <View className="flex flex-row w-full h-[50}">
      <ScreenTitleHeader variant="lg">Last Activities</ScreenTitleHeader>
      <View className="flex-1 pr-4">
        <BellIco />
      </View>
    </View>
  );
}
