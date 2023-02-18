import React from 'react';
import { View } from 'react-native';
import { CustomInput } from '../Atoms/CustomInput';
import { InputLabel } from '../Atoms/InputLabel';
import { AppInputProps } from '../../frontendSelfTypes/moduleProps/AppInputProps';

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
  onFocus,
  onDeFocus,
  refGetter,
  onSubmit,
}: AppInputProps<T>) {
  return (
    <View className={`w-full ${additionalStyles}`}>
      <CustomInput
        refGetter={refGetter}
        onSubmit={onSubmit}
        onFocus={onFocus}
        onDeFocus={onDeFocus}
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
