import { TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AppButton } from '../Atoms/AppButton';
import { RegisterMobiPropsBase } from '../../frontendSelfTypes/navigation/types';
import { NameAndSurnameData } from '../../../farm-service-be/types/Useer/RegisterDataObject';
import { AppInput } from '../Molecules/AppInput';
import {
  handleRestoreData,
  handleSaveDataMerge,
} from '../../helpers/handlers/AsyncStoreHelpers';

export function PersonalDataForm({
  navigation,
}: RegisterMobiPropsBase<'PersonalData'>) {
  const [data, setData] = useState<NameAndSurnameData>({
    name: '',
    surname: '',
  });
  const input2 = React.createRef<TextInput>();
  useEffect(() => {
    (async () => {
      console.log(
        await handleRestoreData('RegisterMobiDataNameSurname', setData),
      );
    })();
  }, []);
  return (
    <View className="w-10/12 pt-10">
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
        action={() =>
          handleSaveDataMerge(
            'RegisterMobiDataNameSurname',
            data,
            navigation,
            'ContactPhones',
          )
        }
        context="Next"
        additionalStyles="mt-36"
      />
    </View>
  );
}
