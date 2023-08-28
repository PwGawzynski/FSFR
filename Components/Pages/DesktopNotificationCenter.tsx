import { SafeAreaView, View } from 'react-native';
import { useState } from 'react';
import { ScreenTitleHeader } from '../Atoms/ScreenTitleHeader';
import { ThreeOptionSwitch } from '../Molecules/ThreeOptionSwitch';
import {
  EventType,
  ThreeOptionSwitchStates,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { Notifications } from '../Organisms/Notifications';

export function DesktopNotificationCenter() {
  const [filterOptions, setFilterOptions] = useState<ThreeOptionSwitchStates>({
    firstOptionName: EventType[0],
    firstOptionState: true,
    secondOptionName: EventType[1],
    secondOptionState: true,
    thirdOptionName: EventType[2],
    thirdOptionState: true,
  });
  return (
    <SafeAreaView className="flex w-full h-full">
      <View className="flex-row mr-2 ml-2 mt-4 items-center">
        <ScreenTitleHeader variant="sm">Notifications</ScreenTitleHeader>
        <ThreeOptionSwitch options={filterOptions} setter={setFilterOptions} />
      </View>
      <Notifications filterOptions={filterOptions} />
    </SafeAreaView>
  );
}
