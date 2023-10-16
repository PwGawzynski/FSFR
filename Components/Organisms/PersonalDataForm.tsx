import { TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AppButton } from '../Atoms/AppButton';
import { AppInput } from '../Molecules/AppInput';
import {
  handleRestoreData,
  handleSaveDataMerge,
} from '../../helpers/handlers/AsyncStoreHelpers';
import { NameAndSurnameData } from '../../FrontendSelfTypes/RegisterMobi/RegisterScreensData';
import { useValidation } from '../../helpers/hooks/validationHook';
import { ErrorInfoText } from '../Atoms/ErrorInfoText';
import { PersonalDataSchema } from '../../helpers/validation/mobileSchemas/PersonalDataSchema';
import { RegisterMobiPropsBase } from '../../FrontendSelfTypes/navigation/types';

export function PersonalDataForm({
  navigation,
}: RegisterMobiPropsBase<'PersonalData'>) {
  const input2 = React.createRef<TextInput>();

  const [data, setData] = useState<NameAndSurnameData>({
    name: '',
    surname: '',
  });
  const [btnClicked, setBtnClicked] = useState(false);
  const [validator, canValidate] = useValidation(data, PersonalDataSchema, [
    btnClicked,
  ]);

  useEffect(() => {
    (async () => {
      await handleRestoreData('RegisterMobiDataNameSurname', setData);
    })();
  }, []);

  useEffect(() => {
    if (!validator.isError && btnClicked) {
      handleSaveDataMerge(
        'RegisterMobiDataNameSurname',
        data,
        navigation,
        'ContactPhones',
      );
    }
  }, [validator]);

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
        ObjectKey="name"
        value={data.name}
        underlyingLabel="Name"
        onSubmit={() => input2.current?.focus()}
      />
      <AppInput
        keyboardHideOnSubmit={false}
        refGetter={input2}
        setter={setData}
        ObjectKey="surname"
        value={data.surname}
        underlyingLabel="Surname"
        onSubmit={() =>
          handleSaveDataMerge(
            'RegisterMobiDataNameSurname',
            data,
            navigation,
            'ContactPhones',
          )
        }
      />
      <AppButton
        action={() => {
          canValidate(true);
          setBtnClicked(true);
        }}
        context="Next"
        abs="mt-36"
      />
    </View>
  );
}
