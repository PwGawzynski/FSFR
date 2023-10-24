import { SafeAreaView, View } from 'react-native';
import React from 'react';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';
import { MagnifierButton } from '../../../../Molecules/MagnifierButton';
import { OwnerWorkersMaterialRootProps } from '../../../../../FrontendSelfTypes/navigation/types';
import { WorkersList } from '../../../../Organisms/WorkersList';

export function WorkersRoot({
  navigation,
}: OwnerWorkersMaterialRootProps<
  'materialWorkersRoot',
  'workersRoot',
  'workers'
>) {
  return (
    <SafeAreaView className="w-full h-full">
      <View className="flex-1 ml-4 mr-4">
        <View className="flex mt-4 items-center flex-row justify-between">
          <ScreenTitleHeader variant="lg">Workers</ScreenTitleHeader>
          <MagnifierButton
            onPress={() => navigation.navigate('searchWorker')}
          />
        </View>
        <WorkersList />
      </View>
    </SafeAreaView>
  );
}
