import { TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { AppButton } from '../Atoms/AppButton';
import { RegisterMobiPropsBase } from '../../frontendSelfTypes/navigation/types';
import { ContactPhonesData } from '../../../farm-service-be/types/Useer/RegisterDataObject';
import { AppInput } from '../Molecules/AppInput';

export function ContactPhonesForm({
  navigation,
}: RegisterMobiPropsBase<'ContactPhones'>) {
  const [data, setData] = useState<ContactPhonesData>({
    contactPhone: '',
    companyCompactPhone: '',
  });
  const input2 = React.createRef<TextInput>();
  return (
    <View className="w-10/12 pt-10">
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
      <AppInput
        keyboardHideOnSubmit={false}
        refGetter={input2}
        setter={setData}
        ObjectKey="companyCompactPhone"
        value={data.companyCompactPhone}
        underlyingLabel="Company Contact Phone"
        keyboardType="phone-pad"
        onSubmit={() => navigation.navigate('Addresses')}
      />
      <AppButton
        action={() => navigation.navigate('Addresses')}
        context="Next"
        additionalStyles="mt-36"
      />
    </View>
  );
}
