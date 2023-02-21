import { Animated, Dimensions } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterAsk } from '../Molecules/RegisterAsk';
import { ForgotPasswordReset } from '../Molecules/ForgotPasswordReset';
import { handleLoginPgAnimation } from '../../helpers/handlers/LoginHandlers';
import { LoginProps } from '../../frontendSelfTypes/moduleProps/ComponentsProps';

export function Login({ navigation, onOff, setOnOff }: LoginProps) {
  const elPosition = useRef(new Animated.Value(0)).current;
  const screenHeight = Dimensions.get('window').height;
  useEffect(() => {
    handleLoginPgAnimation(onOff, elPosition, screenHeight);
  });
  return (
    <Animated.View
      className="w-8/12 bg-white items-center"
      style={{
        transform: [{ translateY: elPosition }],
      }}
    >
      <LoginForm
        onDeFocus={() => {
          setOnOff(false);
        }}
        onFocus={() => setOnOff(true)}
      />
      <RegisterAsk navigation={navigation} />
      <ForgotPasswordReset navigation={navigation} />
    </Animated.View>
  );
}
