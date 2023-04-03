import { TextInput, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { AppButton } from '../Atoms/AppButton';
import { RegisterMobiPropsBase } from '../../frontendSelfTypes/navigation/types';
import { AppInput } from '../Molecules/AppInput';
import {
  handleRestoreData,
  handleSaveDataMerge,
} from '../../helpers/handlers/AsyncStoreHelpers';
import { handleGetDataFromStore } from '../../helpers/handlers/handleGetDataFromStore';
import { Api } from '../../helpers/api/Api';
import { CompanyAddressDataCdn } from '../../FrontendSelfTypes/RegisterMobi/RegisterScreensData';
import { ErrorInfoText } from '../Atoms/ErrorInfoText';
import {
  ResponseCode,
  ResponseObject,
} from '../../FarmServiceTypes/Respnse/responseGeneric';
import { AppSettings } from '../../helpers/appSettings/contexts';

function handleErrorOccurred(e: unknown) {
  if (!(e instanceof AxiosError))
    return 'Some error occurred, please try again later';
  const message = e.response?.data?.payload?.message;
  if (!message) return 'Some error occurred, please try again later';
  return message;
}

export function AddressFormCdn({
  navigation,
}: RegisterMobiPropsBase<'AddressesCdn'>) {
  const [data, setData] = useState<CompanyAddressDataCdn>({
    apartmentNumber: '',
    houseNumber: '',
    postalCode: '',
  });
  const input2 = React.createRef<TextInput>();
  const input3 = React.createRef<TextInput>();
  const input4 = React.createRef<TextInput>();

  const appSetters = useContext(AppSettings).setters;

  const createUserMutation = useMutation(
    async (userData: CompanyAddressDataCdn) => {
      const storedData = await handleGetDataFromStore();
      if (storedData) {
        const authResponse = await Api.registerInAuthUser({
          email: storedData.email,
          password: storedData.password,
        });
        if (authResponse) {
          const response = (
            await Api.registerNewUser({
              ...storedData,
              ...userData,
            })
          ).data as ResponseObject;
          if (
            response.code === ResponseCode.ProcessedWithoutConfirmationWaiting
          ) {
            appSetters.setLogged(true);
          }
        } else {
          console.warn('Cannot restore data in AddressesCdn');
          throw new Error('Something bad happen, try again later');
        }
      }
    },
  );

  useEffect(() => {
    (async () => {
      await handleRestoreData('RegisterMobiDataAddressesCdn', setData);
    })();
  }, []);

  return (
    <View className="w-10/12 pt-10 items-center">
      {createUserMutation.isError && (
        <ErrorInfoText additionalStyles="top-[-20]">
          {handleErrorOccurred(createUserMutation.error)}
        </ErrorInfoText>
      )}
      <AppInput
        keyboardHideOnSubmit={false}
        autoFocus
        setter={setData}
        ObjectKey="apartmentNumber"
        value={data.apartmentNumber}
        underlyingLabel="Apartment Number"
        keyboardType="number-pad"
        onSubmit={() => input2.current?.focus()}
      />
      <AppInput
        keyboardHideOnSubmit={false}
        refGetter={input2}
        setter={setData}
        ObjectKey="houseNumber"
        value={data.houseNumber}
        underlyingLabel="House Number"
        keyboardType="number-pad"
        onSubmit={() => input3.current?.focus()}
      />
      <AppInput
        refGetter={input3}
        keyboardHideOnSubmit={false}
        setter={setData}
        ObjectKey="postalCode"
        value={data.postalCode}
        underlyingLabel="Postal Code"
        keyboardType="numbers-and-punctuation"
        onSubmit={() => input4.current?.focus()}
      />
      <AppButton
        action={() => {
          createUserMutation.mutate(data);
          handleSaveDataMerge('RegisterMobiDataAddressesCdn', data, navigation);
        }}
        context="Next"
        additionalStyles="mt-10"
      />
      {createUserMutation.isError && (
        <ErrorInfoText additionalStyles="mt-10">
          {handleErrorOccurred(createUserMutation.error)}
        </ErrorInfoText>
      )}
    </View>
  );
}
