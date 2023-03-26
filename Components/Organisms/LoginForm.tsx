import { View } from 'react-native';
import React, { useContext, useState } from 'react';
import { DeviceType } from 'expo-device';
import { useMutation } from 'react-query';
import { AppInput } from '../Molecules/AppInput';
import { AppButton } from '../Atoms/AppButton';
import { OrLabel } from '../Atoms/OrLabel';
import { AppSettings } from '../../helpers/appSettings/contexts';
import { LoginFormProps } from '../../frontendSelfTypes/moduleProps/ComponentsProps';
import { LoginUser } from '../../FarmServiceTypes/User/LoginUser';
import { Api } from '../../helpers/api/Api';

export function LoginForm({ onFocus, onDeFocus }: LoginFormProps) {
  const [data, setData] = useState({
    login: '',
    password: '',
  } as LoginUser);
  const { deviceType } = useContext(AppSettings).settings;

  const loginMutation = useMutation(async (loginData: LoginUser) => {
    return Api.loginUser(loginData);
  });

  return (
    <View
      className={`w-full mt-14 ${
        deviceType === DeviceType.PHONE
          ? ''
          : 'flex-1 flex-row items-center justify-center m-0'
      }`}
    >
      <View
        className={`${
          deviceType === DeviceType.PHONE
            ? ''
            : 'flex-1 items-center justify-center  mr-10'
        }`}
      >
        <AppInput
          keyboardHideOnSubmit
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
          keyboardHideOnSubmit
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
      </View>
      <View
        className={`${
          deviceType === DeviceType.PHONE
            ? ''
            : 'flex-1 items-center flex-col justify-center ml-10'
        }`}
      >
        <AppButton
          action={() => {
            loginMutation.mutate(data);
          }}
          context="Login"
          additionalStyles={`${deviceType === DeviceType.PHONE ? 'mt-10' : ''}`}
        />
        <OrLabel />
        <AppButton
          action={() => {
            console.log('GOOGLE LOGIN ACTION');
          }}
          context="Login with google"
          additionalStyles={`${deviceType === DeviceType.PHONE ? '' : ''}`}
        />
      </View>
    </View>
  );
}
