import { StackScreenProps } from '@react-navigation/stack';
import { Image, View } from 'react-native';
import React from 'react';
import { LoginStackParamList } from '../../App';
import { RegisterForm } from '../Organisms/RegisterForm';

type Props = StackScreenProps<LoginStackParamList>;
export function Register({ navigation }: Props) {
  return (
    <View className="w-screen h-screen items-center">
      <Image
        resizeMode="cover"
        className="max-w-max h-1/4"
        source={require('../../assets/loginBg.jpg')}
      />
      <RegisterForm />
    </View>
  );
}
