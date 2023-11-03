import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import React from 'react';
import { getFontScaledSize } from '../../helpers/style/fontSize';
import { AppEnumBasedPickerInputProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { InputLabel } from './InputLabel';

export function AppEnumBasedPickerInput<T extends { [p: string]: unknown }>({
  onChange,
  enumName,
}: AppEnumBasedPickerInputProps<T>) {
  return (
    <View className="">
      <RNPickerSelect
        onValueChange={onChange}
        style={{
          inputIOS: {
            textAlign: 'left',
            fontSize: getFontScaledSize(18),
            borderBottomColor: '#000',
            borderBottomWidth: 4,
            height: 60,
          },
          done: {
            textAlign: 'center',
            alignItems: 'center',
            width: '100%',
          },
          placeholder: {
            color: /* validationError ? 'red' : */ '#848484',
          },
        }}
        items={(
          Object.values(enumName).filter(e =>
            Number.isNaN(Number(e)),
          ) as Array<string>
        ).map((name: string) => ({
          label: name,
          value: name,
        }))}
      />
      <InputLabel>Position</InputLabel>
    </View>
  );
}
