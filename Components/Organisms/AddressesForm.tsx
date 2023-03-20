import { TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AppButton } from '../Atoms/AppButton';
import { RegisterMobiPropsBase } from '../../frontendSelfTypes/navigation/types';
import { AppInput } from '../Molecules/AppInput';
import { CompanyAddressData } from '../../../FarmServiceBE/farm-service-be/types/Useer/RegisterDataObject';
import {
  handleRestoreData,
  handleSaveDataMerge,
} from '../../helpers/handlers/AsyncStoreHelpers';

export function AddressesForm({
  navigation,
}: RegisterMobiPropsBase<'Addresses'>) {
  const [data, setData] = useState<CompanyAddressData>({
    city: '',
    houseNumber: '',
    postalCode: '',
    circumference: '',
  });
  const input2 = React.createRef<TextInput>();
  const input3 = React.createRef<TextInput>();
  const input4 = React.createRef<TextInput>();
  useEffect(() => {
    (async () => {
      console.log(
        await handleRestoreData('RegisterMobiDataAddresses', setData),
      );
    })();
  }, []);
  return (
    <View className="w-10/12 pt-10">
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
      <AppInput
        keyboardHideOnSubmit={false}
        refGetter={input4}
        setter={setData}
        ObjectKey="circumference"
        value={data.circumference}
        underlyingLabel="Circumference"
      />
      <AppButton
        action={() =>
          handleSaveDataMerge(
            'RegisterMobiDataAddresses',
            data,
            navigation,
            'Addresses',
          )
        }
        context="Next"
        additionalStyles="mt-10"
      />
    </View>
  );
}
