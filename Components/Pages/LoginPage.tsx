import { View } from 'react-native';
import React, { useState } from 'react';
import { Login } from '../Organisms/Login';
import { LogoImageAnimated } from '../Organisms/LogoImageAnimated';
import { LoginPageBase } from '../../FrontendSelfTypes/navigation/types';

export function LoginPage({ navigation }: LoginPageBase) {
  const [el, sEl] = useState(false);
  return (
    <View className="w-max h-screen bg-white items-center">
      <LogoImageAnimated onOff={el} />
      <Login setOnOff={sEl} onOff={el} navigation={navigation} />
    </View>
  );
}
