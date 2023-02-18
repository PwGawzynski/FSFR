import { View } from 'react-native';
import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Login } from '../Organisms/Login';
import { LoginStackParamList } from '../../App';
import { LogoImageAnimated } from '../Organisms/LogoImageAnimated';

type Props = StackScreenProps<LoginStackParamList>;
export function LoginPage({ navigation }: Props) {
  const [el, sEl] = useState(false);
  return (
    <View className="w-max h-screen bg-white items-center">
      <LogoImageAnimated onOff={el} />
      <Login setOnOff={sEl} onOff={el} navigation={navigation} />
    </View>
  );
}
