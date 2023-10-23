import { SafeAreaView, View } from 'react-native';
import React from 'react';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';
import { AppButton } from '../../../../Atoms/AppButton';
import { MagnifierButton } from '../../../../Molecules/MagnifierButton';
import { OwnerWorkersMaterialRootProps } from '../../../../../FrontendSelfTypes/navigation/types';

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
        <ScreenTitleHeader variant="lg">Workers</ScreenTitleHeader>
        <View className="flex items-center w-full flex-row mt-4">
          <AppButton
            action={() => ''}
            context="History"
            abs="flex-1 h-8 mr-32"
          />
          <View className="flex-1 flex-row items-center">
            <AppButton
              action={() => ''}
              context="All"
              abs="flex-1 h-8 bg-[#279840]"
            />
            <MagnifierButton
              onPress={() => navigation.navigate('searchOrder')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
