import { View } from 'react-native';
import React, { useState } from 'react';
import { AppInput } from '../Molecules/AppInput';
import { AppButton } from '../Atoms/AppButton';
import { OrLabel } from '../Atoms/OrLabel';

export interface DataObject {
  login: string;
  password: string;
}

export function LoginForm() {
  const [data, setData] = useState({
    login: '',
    password: '',
  } as DataObject);

  return (
    <View className="w-full mt-14">
      <AppInput
        setter={setData}
        underlyingLabel="UserName or NIP or E-mail"
        ObjectKey="login"
        value={data.login}
        inputMode="username"
        autoComplete="username"
      />
      <AppInput
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
