import { StackScreenProps } from '@react-navigation/stack';
import { Image, View } from 'react-native';
import React from 'react';
import { LoginStackParamList } from '../../App';
import { RegisterForm } from '../Organisms/RegisterForm';

type Props = StackScreenProps<LoginStackParamList>;
export function Register({ navigation }: Props) {
  return (
    <View className="w-screen h-screen items-center bg-white">
      <View className="w-screen h-1/5 bg-black">
        <Image
          resizeMode="stretch"
          className="w-full h-full"
          source={require('../../assets/loginBg.png')}
        />
      </View>
      <RegisterForm />
    </View>
  );
}
