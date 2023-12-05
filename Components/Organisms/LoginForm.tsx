import { View } from 'react-native';
import React, { useContext, useState } from 'react';
import { DeviceType } from 'expo-device';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { AppInput } from '../Molecules/AppInput';
import { AppButton } from '../Atoms/AppButton';
import { OrLabel } from '../Atoms/OrLabel';
import { AppSettings } from '../../helpers/appSettings/contexts';
import { LoginUser } from '../../FarmServiceTypes/User/LoginUser';
import { Api } from '../../helpers/api/Api';
import { LoginFormProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { ErrorInfoText } from '../Atoms/ErrorInfoText';

export function LoginForm({ onFocus, onDeFocus }: LoginFormProps) {
  const [data, setData] = useState({
    login: '',
    password: '',
  } as LoginUser);
  const { deviceType } = useContext(AppSettings).settings;
  const { setLogged } = useContext(AppSettings).setters;

  const loginMutation = useMutation(async (loginData: LoginUser) => {
    const response = await Api.loginUser(loginData);
    if (response === true) setLogged(true);
    return response;
  });
  let { error } = loginMutation;
  if (error instanceof AxiosError)
    error = (error.response as any).data.payload.message;
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
        {loginMutation.isError && (
          <ErrorInfoText additionalStyles="text-center">
            {(error as any).toString()}
          </ErrorInfoText>
        )}
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
            // eslint-disable-next-line no-console
            console.log(loginMutation.mutate(data), 'LOGIN_MUT_ELS');
          }}
          context="Login"
          abs={`${deviceType === DeviceType.PHONE ? 'mt-10' : ''}`}
        />
        <OrLabel />
        <AppButton
          action={() => {
            // eslint-disable-next-line no-console
            console.log('GOOGLE LOGIN ACTION');
          }}
          context="Login with google"
          abs={`${deviceType === DeviceType.PHONE ? '' : ''}`}
        />
      </View>
    </View>
  );
}
