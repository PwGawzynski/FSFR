import { TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AppInput } from '../Molecules/AppInput';
import { AppButton } from '../Atoms/AppButton';
import { OrLabel } from '../Atoms/OrLabel';
import { EmailAndPasswordData } from '../../../farm-service-be/types/Useer/RegisterDataObject';
import { RegisterMobiPropsBase } from '../../frontendSelfTypes/navigation/types';
import {
  handleRestoreData,
  handleSaveDataMerge,
} from '../../helpers/handlers/AsyncStoreHelpers';

export function EmailAndPasswordForm({
  navigation,
}: RegisterMobiPropsBase<'EmailAndPassword'>) {
  const input2 = React.createRef<TextInput>();

  const [data, setData] = useState<EmailAndPasswordData>({
    email: '',
    password: '',
  });
  useEffect(() => {
    (async () => {
      console.log(await handleRestoreData('RegisterMobiData', setData));
    })();
  }, []);
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
        onSubmit={() =>
          handleSaveDataMerge(
            'RegisterMobiData',
            data,
            navigation,
            'PersonalData',
          )
        }
      />
      <AppButton
        action={() =>
          handleSaveDataMerge(
            'RegisterMobiData',
            data,
            navigation,
            'PersonalData',
          )
        }
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
