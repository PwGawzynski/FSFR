import { TextInput, View } from 'react-native';
import React from 'react';
import { InputLabel } from '../Atoms/InputLabel';
import { NumericInputProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function NumericInput({
  value,
  setter,
  label,
  onBlur,
  abs,
}: NumericInputProps) {
  return (
    <View className={`grow flex-col ${abs}`}>
      <TextInput
        onBlur={onBlur}
        textAlignVertical="center"
        className="text-xl border-b-2 border-black border-solid  text-[#848484]"
        keyboardType="numbers-and-punctuation"
        value={value}
        onChangeText={text => setter(text.replace(/[^0-9.]/g, ''))}
      />
      <InputLabel>{label}</InputLabel>
    </View>
  );
}
