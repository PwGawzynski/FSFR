import { View } from 'react-native';
import React from 'react';
import { RegisterForm } from '../Organisms/RegisterForm';
import { LogoImageCurtain } from '../Atoms/LogoImageCurtain';
import { RegisterProps } from '../../frontendSelfTypes/moduleProps/ComponentsProps';

export function Register({ navigation }: RegisterProps) {
  return (
    <View className="w-screen h-screen items-center bg-white">
      <LogoImageCurtain />
      <RegisterForm navigation={navigation} />
    </View>
  );
}
