import { TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
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
import { useValidation } from '../../helpers/hooks/validationHook';
import { handlePrintErrorToUser } from '../../helpers/handlers/HandlePrintErrorToUser';

export function EmailAndPasswordForm({
  navigation,
}: RegisterMobiPropsBase<'EmailAndPassword'>) {
  const input2 = React.createRef<TextInput>();

  const [data, setData] = useState<EmailAndPasswordData>({
    email: '',
    password: '',
  });

  const dataValidationSchema = Yup.object().shape({
    email: Yup.string().max(200).email('Invalid Email').required(),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .max(200, "Password can't be longer than 200 characters")
      .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`|}{[\]:;\\"'<,>.?/\\-]).+$/)
      .required(),
  });

  const [validator, setCanValidate] = useValidation<EmailAndPasswordData>(
    data,
    dataValidationSchema,
  );

  const registerToIdentity = useMutation(
    async (mutationData: EmailAndPasswordData) => {
      const response = await Api.checkIfExist(mutationData.email);
      if (response.code === ResponseCode.ProcessedCorrect && !validator.isError)
        handleSaveDataMerge(
          'RegisterMobiDataEmailAndPassword',
          { email: data.email, password: '' } as EmailAndPasswordData,
          navigation,
          'ChooseUserRole',
        );
    },
  );
  const [dataRestored, setDataRestored] = useState(false);

  useEffect(() => {
    if (dataRestored) setCanValidate(true);
    if (!validator.isError && dataRestored) registerToIdentity.mutate(data);
  }, [validator, dataRestored]);

  useEffect(() => {
    (async () => {
      setDataRestored(
        await handleRestoreData('RegisterMobiDataEmailAndPassword', setData),
      );
    })();
  }, []);

  return (
    <View className="w-10/12 pt-10 items-center">
      {(registerToIdentity.isError || validator.isError) && (
        <ErrorInfoText additionalStyles="top-[-20]">
          {registerToIdentity.isError
            ? handlePrintErrorToUser(registerToIdentity.error)
            : validator.errorMessages}
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
      />
      <AppButton
        action={() => {
          setCanValidate(true);
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
