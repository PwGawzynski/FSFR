import { Image, View } from 'react-native';
import React from 'react';
import { RegisterForm } from '../Organisms/RegisterForm';
import { RegisterProps } from '../../frontendSelfTypes/moduleProps/RegisterProps';

export function Register({ navigation }: RegisterProps) {
  return (
    <View className="w-screen h-screen items-center bg-white">
      <View className="w-screen h-1/5 bg-black">
        <Image
          resizeMode="stretch"
          className="w-full h-full"
          source={require('../../assets/loginBg.png')}
        />
      </View>
      <RegisterForm navigation={navigation} />
    </View>
  );
}
