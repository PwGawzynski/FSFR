import { View } from 'react-native';
import React from 'react';
import { LogoImage } from '../Atoms/LogoImage';
import { LoginForm } from '../Organisms/LoginForm';
import { RegisterAsk } from '../Molecules/RegisterAsk';
import { ForgotPasswordReset } from '../Molecules/ForgotPasswordReset';
import { Logo } from '../Atoms/Logo';
import { LoginPageTabBase } from '../../frontendSelfTypes/navigation/types';

export function LoginPageTab({ navigation }: LoginPageTabBase) {
  return (
    <View className="w-max h-screen bg-white flex flex-row">
      <LogoImage additionalBoxStyles="w-1/3 h-full" resizeMode="cover" />
      <View className="flex-1 ml-20 mr-20 justify-center items-center">
        <Logo additionalBoxStyles="w-1/3 flex-1" resizeMode="stretch" />
        <LoginForm />
        <RegisterAsk
          additionalBtnStyles="w-7/12"
          additionalStyles="flex-1"
          navigation={navigation}
        />
        <ForgotPasswordReset
          additionalTxtStyles="m-0"
          additionalStyles="flex-1"
          additionalBtnStyles="w-7/12"
          navigation={navigation}
        />
      </View>
    </View>
  );
}
