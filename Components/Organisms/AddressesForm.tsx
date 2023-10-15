import { TextInput, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AppButton } from '../Atoms/AppButton';
import { AppInput } from '../Molecules/AppInput';
import {
  handleRestoreData,
  handleSaveDataMerge,
} from '../../helpers/handlers/AsyncStoreHelpers';
import { CompanyAddressData } from '../../FrontendSelfTypes/RegisterMobi/RegisterScreensData';
import { useValidation } from '../../helpers/hooks/validationHook';
import { ErrorInfoText } from '../Atoms/ErrorInfoText';
import { AddressesSchema } from '../../helpers/validation/mobileSchemas/AddressesSchema';
import { RegisterMobiPropsBase } from '../../FrontendSelfTypes/navigation/types';

export function AddressesForm({
  navigation,
}: RegisterMobiPropsBase<'Addresses'>) {
  const input2 = React.createRef<TextInput>();
  const input3 = React.createRef<TextInput>();
  const input4 = React.createRef<TextInput>();

  const [data, setData] = useState<CompanyAddressData>({
    city: '',
    county: '',
    street: '',
    voivodeship: '',
  });
  const [btnClicked, setBtnClicked] = useState(false);
  const [validator, canValidate] = useValidation(data, AddressesSchema, [
    btnClicked,
  ]);

  useEffect(() => {
    if (!validator.isError && btnClicked) {
      handleSaveDataMerge(
        'RegisterMobiDataAddresses',
        data,
        navigation,
        'AddressesCdn',
      );
    }
  }, [validator]);

  useEffect(() => {
    (async () => {
      await handleRestoreData('RegisterMobiDataAddresses', setData);
    })();
  }, []);
  return (
    <ScrollView className="w-10/12 pt-10">
      {validator.isError && btnClicked && (
        <ErrorInfoText additionalStyles="top-[-20] w-max text-center">
          {validator.errorMessages}
        </ErrorInfoText>
      )}
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
          canValidate(true);
          setBtnClicked(true);
        }}
        context="Next"
        abs="mt-3"
      />
    </ScrollView>
  );
}
