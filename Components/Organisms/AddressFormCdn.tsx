import { TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
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

  const createUserMutation = useMutation(
    async (userData: CompanyAddressDataCdn) => {
      const storedData = await handleGetDataFromStore();
      if (storedData)
        return Api.registerNewUser({ ...storedData, ...userData });
      throw new Error('');
    },
  );

  useEffect(() => {
    (async () => {
      await handleRestoreData('RegisterMobiDataAddressesCdn', setData);
    })();
  }, []);
  return (
    <View className="w-10/12 pt-10">
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
          handleSaveDataMerge('RegisterMobiDataAddressesCdn', data, navigation);
          console.log(createUserMutation.mutate(data));
        }}
        context="Next"
        additionalStyles="mt-10"
      />
    </View>
  );
}
