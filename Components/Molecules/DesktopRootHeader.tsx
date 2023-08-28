import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ScreenTitleHeader } from '../Atoms/ScreenTitleHeader';
import { BellIco } from '../Atoms/BellIco';
import { OwnerMobiDesktopTopTabProps } from '../../FrontendSelfTypes/navigation/types';

export function DesktopRootHeader({
  navigation,
}: OwnerMobiDesktopTopTabProps<'desktopRoot', 'desktop'>) {
  return (
    <View className="flex flex-row  w-full  mb-6">
      <ScreenTitleHeader variant="lg">Last Activities</ScreenTitleHeader>
      <TouchableOpacity
        className="flex-1"
        onPress={() => navigation.navigate('notifications')}
      >
        <BellIco />
      </TouchableOpacity>
    </View>
  );
}
