import { View } from 'react-native';
import React from 'react';
import { AppButton } from '../Atoms/AppButton';
import { OwnerMobiDesktopRootStackProps } from '../../FrontendSelfTypes/navigation/types';

export function DesktopBottomButtons({
  navigation,
}: OwnerMobiDesktopRootStackProps<'desktop'>) {
  return (
    <View className="flex flex-row mb-10 mt-6">
      <AppButton
        abs="flex-1 mr-2"
        action={() => navigation.navigate('orders')}
        context="Orders"
      />
      <AppButton
        abs="flex-1 ml-2"
        action={() => navigation.navigate('workers')}
        context="Workers"
      />
    </View>
  );
}
