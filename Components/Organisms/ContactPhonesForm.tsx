import { TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AppButton } from '../Atoms/AppButton';
import { RegisterMobiPropsBase } from '../../frontendSelfTypes/navigation/types';
import { ContactPhonesData } from '../../../FarmServiceBE/farm-service-be/types/Useer/RegisterDataObject';
import { AppInput } from '../Molecules/AppInput';
import {
  handleRestoreData,
  handleSaveDataMerge,
} from '../../helpers/handlers/AsyncStoreHelpers';

export function ContactPhonesForm({
  navigation,
}: RegisterMobiPropsBase<'ContactPhones'>) {
  const [data, setData] = useState<ContactPhonesData>({
    contactPhone: '+48 ',
  });
  const input2 = React.createRef<TextInput>();
  useEffect(() => {
    (async () => {
      await handleRestoreData('RegisterMobiDataContactPhones', setData);
    })();
  }, []);
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
      <AppButton
        action={() =>
          handleSaveDataMerge(
            'RegisterMobiDataContactPhones',
            data,
            navigation,
            'Addresses',
          )
        }
        context="Next"
        additionalStyles="mt-36"
      />
    </View>
  );
}
