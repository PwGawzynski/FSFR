import { TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { AppInput } from '../Molecules/AppInput';
import { AppButton } from '../Atoms/AppButton';
import { OrLabel } from '../Atoms/OrLabel';
import { EmailAndPasswordData } from '../../../farm-service-be/types/Useer/RegisterDataObject';
import { RegisterMobiPropsBase } from '../../frontendSelfTypes/navigation/types';

export function EmailAndPasswordForm({
  navigation,
}: RegisterMobiPropsBase<'EmailAndPassword'>) {
  const input2 = React.createRef<TextInput>();

  const [data, setData] = useState<EmailAndPasswordData>({
    email: '',
    password: '',
  });

  return (
    <View className="w-10/12 pt-10">
      <AppInput
        autoFocus
        onSubmit={() => input2.current?.focus()}
        setter={setData}
        ObjectKey="email"
        value={data.email}
        inputMode="emailAddress"
        keyboardType="email-address"
        underlyingLabel="Email"
      />
      <AppInput
        refGetter={input2}
        setter={setData}
        underlyingLabel="Password"
        ObjectKey="password"
        value={data.password}
        inputMode="password"
        autoComplete="password"
        additionalStyles="mt-5"
        isPwd
        onSubmit={() => navigation.navigate('PersonalData')}
      />
      <AppButton
        action={() => navigation.navigate('PersonalData')}
        context="Next"
        additionalStyles="mt-10 mb-2"
      />
      <OrLabel />
      <AppButton
        additionalStyles="mt-2"
        action={() => console.log('Register w Google')}
        context="Use Google account To register"
      />
    </View>
  );
}
