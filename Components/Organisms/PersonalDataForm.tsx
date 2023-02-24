import { TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { AppButton } from '../Atoms/AppButton';
import { PersonalDataBase } from '../../frontendSelfTypes/navigation/types';
import { NameAndSurnameData } from '../../../farm-service-be/types/Useer/RegisterDataObject';
import { AppInput } from '../Molecules/AppInput';

export function PersonalDataForm({ navigation }: PersonalDataBase) {
  const [data, setData] = useState<NameAndSurnameData>({
    name: '',
    surname: '',
  });
  const input2 = React.createRef<TextInput>();
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
      />
      <AppButton
        action={() => navigation.navigate('PersonalData')}
        context="Next"
        additionalStyles="mt-36"
      />
    </View>
  );
}
