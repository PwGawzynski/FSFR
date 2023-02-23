import { View } from 'react-native';
import React from 'react';
import { AppInput } from '../Molecules/AppInput';
import { EmailAndPasswordProps } from '../../frontendSelfTypes/moduleProps/ComponentsProps';

export function EmailAndPasswordForm({ data, setData }: EmailAndPasswordProps) {
  return (
    <View className="w-10/12 pt-10">
      <AppInput
        setter={setData}
        ObjectKey="email"
        value={data.email}
        underlyingLabel="Email"
      />
      <AppInput
        setter={setData}
        underlyingLabel="Password"
        ObjectKey="password"
        value={data.password}
        inputMode="password"
        autoComplete="password"
        additionalStyles="mt-5"
        isPwd
      />
    </View>
  );
}
