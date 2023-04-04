import { TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { AppButton } from '../Atoms/AppButton';
import { RegisterMobiPropsBase } from '../../frontendSelfTypes/navigation/types';
import { AppInput } from '../Molecules/AppInput';
import {
  handleRestoreData,
  handleSaveDataMerge,
} from '../../helpers/handlers/AsyncStoreHelpers';
import { ContactPhonesData } from '../../FrontendSelfTypes/RegisterMobi/RegisterScreensData';
import { useValidation } from '../../helpers/hooks/validationHook';
import { ErrorInfoText } from '../Atoms/ErrorInfoText';

export function ContactPhonesForm({
  navigation,
}: RegisterMobiPropsBase<'ContactPhones'>) {
  const [data, setData] = useState<ContactPhonesData>({
    contactPhone: '+48 ',
  });
  const input2 = React.createRef<TextInput>();

  const NameAndSurnameValidationSchema = Yup.object().shape({
    contactPhone: Yup.string().min(13).max(13),
  });

  const [btnClicked, setBtnClicked] = useState(false);

  const [validator, canValidate] = useValidation(
    data,
    NameAndSurnameValidationSchema,
  );

  useEffect(() => {
    if (!validator.isError && btnClicked) {
      handleSaveDataMerge(
        'RegisterMobiDataContactPhones',
        data,
        navigation,
        'Addresses',
      );
    }
  }, [validator]);

  useEffect(() => {
    (async () => {
      await handleRestoreData('RegisterMobiDataContactPhones', setData);
    })();
  }, []);
  return (
    <View className="w-10/12 pt-10">
      {validator.isError && btnClicked && (
        <ErrorInfoText additionalStyles="top-[-20]">
          {validator.errorMessages}
        </ErrorInfoText>
      )}
      <AppInput
        keyboardHideOnSubmit={false}
        autoFocus
        setter={setData}
        ObjectKey="contactPhone"
        value={data.contactPhone}
        underlyingLabel="Your Contact Phone"
        onSubmit={() => input2.current?.focus()}
        keyboardType="phone-pad"
      />
      <AppButton
        action={() => {
          canValidate(true);
          setBtnClicked(true);
        }}
        context="Next"
        additionalStyles="mt-36"
      />
    </View>
  );
}
