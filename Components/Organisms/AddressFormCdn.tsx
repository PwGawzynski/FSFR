import { TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { AppButton } from '../Atoms/AppButton';
import { AppInput } from '../Molecules/AppInput';
import { handleRestoreData } from '../../helpers/handlers/AsyncStoreHelpers';
import { CompanyAddressDataCdn } from '../../FrontendSelfTypes/RegisterMobi/RegisterScreensData';
import { ErrorInfoText } from '../Atoms/ErrorInfoText';
import { handlePrintErrorToUser } from '../../helpers/handlers/HandlePrintErrorToUser';
import { useValidation } from '../../helpers/hooks/validationHook';
import { AddressesCdnSchema } from '../../helpers/validation/mobileSchemas/AddressesCdnSchema';
import { registerService } from '../../helpers/api/Services/Auth';
import { RegisterMobiPropsBase } from '../../FrontendSelfTypes/navigation/types';

export function AddressFormCdn({
  navigation,
}: RegisterMobiPropsBase<'AddressesCdn'>) {
  const input2 = React.createRef<TextInput>();
  const input3 = React.createRef<TextInput>();
  const input4 = React.createRef<TextInput>();

  const [data, setData] = useState<CompanyAddressDataCdn>({
    apartmentNumber: '',
    houseNumber: '',
    postalCode: '',
  });
  const [dataRestored, setDataRestored] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);
  const [validator, setCanValidate] = useValidation(data, AddressesCdnSchema, [
    dataRestored,
    btnClicked,
  ]);
  const createUserMutation = useMutation((userData: CompanyAddressDataCdn) =>
    registerService(userData, navigation),
  );

  useEffect(() => {
    if (!validator.isError && btnClicked) createUserMutation.mutate(data);
  }, [validator]);

  useEffect(() => {
    (async () => {
      setDataRestored(
        await handleRestoreData('RegisterMobiDataAddressesCdn', setData),
      );
    })();
  }, []);

  return (
    <View className="w-10/12 pt-10 items-center">
      {(createUserMutation.isError || validator.isError) && (
        <ErrorInfoText additionalStyles="top-[-20]">
          {validator.isError
            ? validator.errorMessages
            : handlePrintErrorToUser(createUserMutation.error)}
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
          setCanValidate(true);
          setBtnClicked(true);
        }}
        context="Next"
        abs="mt-10"
      />
    </View>
  );
}
