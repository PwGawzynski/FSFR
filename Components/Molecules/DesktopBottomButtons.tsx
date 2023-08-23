import { View } from 'react-native';
import React from 'react';
import { AppButton } from '../Atoms/AppButton';
import { OwnerMobiDesktopTopTabProps } from '../../FrontendSelfTypes/navigation/types';

export function DesktopBottomButtons({
  navigation,
}: OwnerMobiDesktopTopTabProps<'desktopRoot', 'desktop'>) {
  return (
    <View className="flex flex-row">
      <AppButton
        additionalStyles="flex-1 m-2"
        action={() => navigation.navigate('orders')}
        context="Orders"
      />
      <AppButton
        additionalStyles="flex-1 m-2"
        action={() => navigation.navigate('workers')}
        context="Workers"
      />
    </View>
  );
}
