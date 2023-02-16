import React from 'react';
import { View } from 'react-native';
import { CustomInput, CustomInputProps } from '../Atoms/CustomInput';
import { InputLabel } from '../Atoms/InputLabel';

export interface Props<T extends object>
  extends Omit<CustomInputProps, 'onChange'> {
  setter: React.Dispatch<React.SetStateAction<T>>;
  underlyingLabel: string;
  ObjectKey: keyof T;

  additionalStyles?: string;
}
export function AppInput<T extends object>({
  inputMode,
  setter,
  value,
  autoComplete,
  underlyingLabel,
  ObjectKey,
  isPwd,
  additionalStyles,
  keyboardType,
}: Props<T>) {
  return (
    <View className={`w-full ${additionalStyles}`}>
      <CustomInput
        value={value}
        onChange={text =>
          setter(prev => ({
            ...prev,
            [ObjectKey]: text,
          }))
        }
        keyboardType={keyboardType}
        inputMode={inputMode}
        autoComplete={autoComplete}
        isPwd={isPwd}
      />
      <InputLabel>{underlyingLabel}</InputLabel>
    </View>
  );
}
