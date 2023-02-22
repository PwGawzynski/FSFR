import { View } from 'react-native';
import React from 'react';
import { RegisterFormTab } from '../Organisms/RegisterFormTab';
import { RegisterTabProps } from '../../frontendSelfTypes/moduleProps/ComponentsProps';
import { LogoImage } from '../Atoms/LogoImage';

export function RegisterTab({ navigation }: RegisterTabProps) {
  return (
    <View className="w-max h-screen bg-white flex flex-row">
      <LogoImage additionalBoxStyles="w-1/3 h-2/3" resizeMode="cover" />
      <View className="flex-1 items-center">
        <RegisterFormTab navigation={navigation} />
      </View>
    </View>
  );
}
