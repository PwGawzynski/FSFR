import { TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AppButton } from '../Atoms/AppButton';
import { AppInput } from '../Molecules/AppInput';
import {
  handleRestoreData,
  handleSaveDataMerge,
} from '../../helpers/handlers/AsyncStoreHelpers';
import { CompanyNameAndNIPData } from '../../FrontendSelfTypes/RegisterMobi/RegisterScreensData';

export function CompanyNameAndNipForm({ navigation }: any) {
  const [data, setData] = useState<CompanyNameAndNIPData>({
    companyName: '',
    nip: '',
  });
  const input2 = React.createRef<TextInput>();
  useEffect(() => {
    (async () => {
      console.log(
        await handleRestoreData('RegisterMobiDataACompanyNameNip', setData),
      );
    })();
  }, []);
  return (
    <View className="w-10/12 pt-10">
      <AppInput
        keyboardHideOnSubmit={false}
        autoFocus
        setter={setData}
        ObjectKey="companyName"
        value={data.companyName}
        underlyingLabel="Company Name"
        onSubmit={() => input2.current?.focus()}
      />
      <AppInput
        keyboardHideOnSubmit={false}
        refGetter={input2}
        setter={setData}
        ObjectKey="nip"
        value={data.nip}
        underlyingLabel="NIP"
        keyboardType="number-pad"
        onSubmit={() =>
          handleSaveDataMerge(
            'RegisterMobiDataACompanyNameNip',
            data,
            navigation,
            'Addresses',
          )
        }
      />
      <AppButton
        action={() =>
          handleSaveDataMerge(
            'RegisterMobiDataACompanyNameNip',
            data,
            navigation,
            'Addresses',
          )
        }
        context="Next"
        abs="mt-36"
      />
    </View>
  );
}
