import { View } from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { LoginStackParamList } from '../../App';
import { LogoImage } from '../Atoms/LogoImage';
import { LoginForm } from '../Organisms/LoginForm';
import { RegisterAsk } from '../Molecules/RegisterAsk';
import { ForgotPasswordReset } from '../Molecules/ForgotPasswordReset';

type Props = StackScreenProps<LoginStackParamList>;
export function LoginPageTab({ navigation }: Props) {
  return (
    <View className="w-max h-screen bg-white flex flex-row">
      <LogoImage additionalBoxStyles="w-1/3 h-full" resizeMode="cover" />
      <View className="flex-1 ml-20 mr-20 justify-center">
        <LoginForm />
        <RegisterAsk
          additionalBtnStyles="w-7/12"
          additionalStyles="mt-36"
          navigation={navigation}
        />
        <ForgotPasswordReset
          additionalStyles="mt-10"
          additionalBtnStyles="w-7/12"
          navigation={navigation}
        />
      </View>
    </View>
  );
}
