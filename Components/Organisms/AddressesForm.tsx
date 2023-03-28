import { TextInput, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AppButton } from '../Atoms/AppButton';
import { RegisterMobiPropsBase } from '../../frontendSelfTypes/navigation/types';
import { AppInput } from '../Molecules/AppInput';
import {
  handleRestoreData,
  handleSaveDataMerge,
} from '../../helpers/handlers/AsyncStoreHelpers';
import { CompanyAddressData } from '../../FrontendSelfTypes/RegisterMobi/RegisterScreensData';

export function AddressesForm({
  navigation,
}: RegisterMobiPropsBase<'Addresses'>) {
  const [data, setData] = useState<CompanyAddressData>({
    city: '',
    county: '',
    street: '',
    voivodeship: '',
  });
  const input2 = React.createRef<TextInput>();
  const input3 = React.createRef<TextInput>();
  const input4 = React.createRef<TextInput>();

  useEffect(() => {
    (async () => {
      await handleRestoreData('RegisterMobiDataAddresses', setData);
    })();
  }, []);
  return (
    <ScrollView className="w-10/12 pt-4">
      <AppInput
        keyboardHideOnSubmit={false}
        autoFocus
        setter={setData}
        ObjectKey="city"
        value={data.city}
        underlyingLabel="City"
        onSubmit={() => input2.current?.focus()}
      />
      <AppInput
        keyboardHideOnSubmit={false}
        refGetter={input2}
        setter={setData}
        ObjectKey="county"
        value={data.county}
        underlyingLabel="County"
        onSubmit={() => input3.current?.focus()}
      />
      <AppInput
        refGetter={input3}
        keyboardHideOnSubmit={false}
        setter={setData}
        ObjectKey="street"
        value={data.street}
        underlyingLabel="Street name"
        onSubmit={() => input4.current?.focus()}
      />
      <AppInput
        keyboardHideOnSubmit={false}
        refGetter={input4}
        setter={setData}
        ObjectKey="voivodeship"
        value={data.voivodeship}
        underlyingLabel="Voivodeship"
      />
      <AppButton
        action={() => {
          handleSaveDataMerge(
            'RegisterMobiDataAddresses',
            data,
            navigation,
            'AddressesCdn',
          );
        }}
        context="Next"
        additionalStyles="mt-3"
      />
    </ScrollView>
  );
}
