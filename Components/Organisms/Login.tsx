import { View } from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { LoginForm } from './LoginForm';
import { LoginStackParamList } from '../../App';
import { RegisterAsk } from '../Molecules/RegisterAsk';
import { ForgotPasswordReset } from '../Molecules/ForgotPasswordReset';

type Props = Omit<StackScreenProps<LoginStackParamList>, 'route'>;

export function Login({ navigation }: Props) {
  return (
    <View className="w-8/12 bg-white items-center">
      <LoginForm />
      <RegisterAsk navigation={navigation} />
      <ForgotPasswordReset navigation={navigation} />
    </View>
  );
}
