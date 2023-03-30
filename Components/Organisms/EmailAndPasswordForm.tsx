import { TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import * as Yup from 'yup';
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
import { ResponseCode } from '../../FarmServiceTypes/Respnse/responseGeneric';
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

  const registerToIdentity = useMutation(
    async (mutationData: EmailAndPasswordData) => {
      const response = await Api.checkIfExist(mutationData.email);
      if (response.code === ResponseCode.ProcessedCorrect)
        handleSaveDataMerge(
          'RegisterMobiDataEmailAndPassword',
          data,
          navigation,
          'ChooseUserRole',
        );
    },
  );
  const dataValidationSchema = Yup.object().shape({
    email: Yup.string().max(200).email().required(),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .max(200, "Password can't be longer than 200 characters")
      .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`|}{[\]:;\\"'<,>.?/\\-]).+$/),
  });
  useEffect(() => {
    (async () => {
      await handleRestoreData('RegisterMobiDataEmailAndPassword', setData);
    })();
  }, []);

  const [validationError, setValidationError] = useState({
    isError: false,
    errorMessages: [] as Array<string>,
  });

  return (
    <View className="w-10/12 pt-10 items-center">
      {(registerToIdentity.isError || validationError.isError) && (
        <ErrorInfoText additionalStyles="top-[-20]">
          {registerToIdentity.isError
            ? handleErrorOccurred(registerToIdentity.error)
            : validationError.errorMessages}
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
        action={async () => {
          try {
            console.log(await dataValidationSchema.validate(data));
          } catch (e) {
            if (e instanceof Yup.ValidationError) {
              console.log(e.errors);
              setValidationError({
                isError: true,
                errorMessages: e.errors,
              });
            }
          }
          //           registerToIdentity.mutate(data);
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
