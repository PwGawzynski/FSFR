import { SafeAreaView, View } from 'react-native';
import React from 'react';
import { DesktopRootHeader } from '../Molecules/DesktopRootHeader';
import { DesktopBottomButtons } from '../Molecules/DesktopBottomButtons';
import { OwnerMobiDesktopTopTabProps } from '../../FrontendSelfTypes/navigation/types';

export function DesktopRootMobi({
  navigation,
  route,
}: OwnerMobiDesktopTopTabProps<'desktopRoot', 'desktop'>) {
  return (
    <SafeAreaView>
      <DesktopRootHeader />
      <DesktopBottomButtons navigation={navigation} route={route} />
      <View className="flex flex-col" />
    </SafeAreaView>
  );
}
