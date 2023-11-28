import { SafeAreaView } from 'react-native';
import React from 'react';
import { DesktopRootHeader } from '../Molecules/DesktopRootHeader';
import { DesktopBottomButtons } from '../Molecules/DesktopBottomButtons';
import { OwnerMobiDesktopTopTabProps } from '../../FrontendSelfTypes/navigation/types';
import { LastActivities } from '../Organisms/LastActivities';

export function DesktopRootMobi({
  navigation,
  route,
}: OwnerMobiDesktopTopTabProps<'desktopRoot', 'desktop'>) {
  return (
    <SafeAreaView className="mr-4 ml-4  h-full">
      <DesktopRootHeader navigation={navigation} route={route} />
      <LastActivities />
      <DesktopBottomButtons navigation={navigation} route={route} />
    </SafeAreaView>
  );
}
