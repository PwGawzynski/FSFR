import { SafeAreaView } from 'react-native';
import React from 'react';
import { DesktopRootHeader } from '../Molecules/DesktopRootHeader';
import { DesktopBottomButtons } from '../Molecules/DesktopBottomButtons';
import { OwnerMobiDesktopTopTabProps } from '../../FrontendSelfTypes/navigation/types';
import { Api } from '../../helpers/api/Api';
import { LastActivities } from '../Organisms/LastActivities';

export function DesktopRootMobi({
  navigation,
  route,
}: OwnerMobiDesktopTopTabProps<'desktopRoot', 'desktop'>) {
  Api.getAllActivities();
  return (
    <SafeAreaView className="mr-4 ml-4  h-full">
      <DesktopRootHeader />
      <LastActivities />
      <DesktopBottomButtons navigation={navigation} route={route} />
    </SafeAreaView>
  );
}
