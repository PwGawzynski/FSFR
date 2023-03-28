import { TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { AppInput } from '../Molecules/AppInput';
import { AppButton } from '../Atoms/AppButton';
import { OrLabel } from '../Atoms/OrLabel';
import { RegisterMobiPropsBase } from '../../frontendSelfTypes/navigation/types';
import {
  handleRestoreData,
  handleSaveDataMerge,
} from '../../helpers/handlers/AsyncStoreHelpers';
import { EmailAndPasswordData } from '../../FrontendSelfTypes/RegisterMobi/RegisterScreensData';
import { Api } from '../../helpers/api/Api';
import {
  ResponseCode,
  ResponseObject,
} from '../../FarmServiceTypes/Respnse/responseGeneric';
import { ErrorInfoText } from '../Atoms/ErrorInfoText';

function handleErrorOccurred(e: unknown) {
  if (!(e instanceof AxiosError))
    return 'Some error occurred, please try again later';
  const message = e.response?.data?.payload?.message;
  if (e.response?.status === StatusCodes.CONFLICT && message) return message;
  return 'Some error occurred, please try again later';
}

export function EmailAndPasswordForm({
  navigation,
}: RegisterMobiPropsBase<'EmailAndPassword'>) {
  const input2 = React.createRef<TextInput>();

  const [data, setData] = useState<EmailAndPasswordData>({
    email: '',
    password: '',
  });

  const [canMoveOn, setCanMoveOn] = useState(false);

  const registerToIdentity = useMutation(
    async (mutationData: EmailAndPasswordData) => {
      const response = await Api.registerInAuthUser(mutationData);
      if (response.code === ResponseCode.ProcessedCorrect) setCanMoveOn(true);
    },
  );
  useEffect(() => {
    (async () => {
      await handleRestoreData('RegisterMobiDataEmailAndPassword', setData);
      if (canMoveOn)
        handleSaveDataMerge(
          'RegisterMobiDataEmailAndPassword',
          data,
          navigation,
          'ChooseUserRole',
        );
    })();
  }, [canMoveOn, data, navigation]);
  return (
    <View className="w-10/12 pt-10 items-center">
      {registerToIdentity.isError && (
        <ErrorInfoText additionalStyles="top-[-20]">
          {handleErrorOccurred(registerToIdentity.error)}
        </ErrorInfoText>
      )}
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
        action={() => {
          registerToIdentity.mutate(data);
        }}
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
