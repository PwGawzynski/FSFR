import { View } from 'react-native';
import React from 'react';
import { RegisterFormTab } from '../Organisms/RegisterFormTab';
import { LogoImageCurtain } from '../Atoms/LogoImageCurtain';
import { RegisterProps } from '../../frontendSelfTypes/moduleProps/ComponentsProps';

export function Register({ navigation }: RegisterProps) {
  return (
    <View className="w-screen h-screen items-center bg-white">
      <LogoImageCurtain />
      <RegisterFormTab navigation={navigation} />
    </View>
  );
}
