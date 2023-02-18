import { View } from 'react-native';
import React, { useState } from 'react';
import { LoginFormProps } from 'frontendSelfTypes/moduleProps/LoginFormProps';
import { AppInput } from '../Molecules/AppInput';
import { AppButton } from '../Atoms/AppButton';
import { OrLabel } from '../Atoms/OrLabel';
import { LoginDataObject } from '../../../farm-service-be/types/Useer/LoginDataObject';

export function LoginForm({ onFocus, onDeFocus }: LoginFormProps) {
  const [data, setData] = useState({
    login: '',
    password: '',
  } as LoginDataObject);
  return (
    <View className="w-full mt-14">
      <AppInput
        onDeFocus={onDeFocus}
        onFocus={onFocus}
        setter={setData}
        underlyingLabel="UserName or NIP or E-mail"
        ObjectKey="login"
        value={data.login}
        inputMode="username"
        autoComplete="username"
      />
      <AppInput
        onDeFocus={onDeFocus}
        onFocus={onFocus}
        setter={setData}
        underlyingLabel="Password"
        ObjectKey="password"
        value={data.password}
        inputMode="password"
        autoComplete="password"
        isPwd
      />

      <AppButton
        action={() => {
          console.log('LOGIN ACTION');
        }}
        context="Login"
        additionalStyles="mt-10"
      />
      <OrLabel />
      <AppButton
        action={() => {
          console.log('GOOGLE LOGIN ACTION');
        }}
        context="Login with google"
      />
    </View>
  );
}
