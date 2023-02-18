import React, { useContext } from 'react';
import { TextInput } from 'react-native';
import { AppSettings, ThemeOptions } from '../../helpers/appSettings/contexts';
import { CustomInputProps } from '../../frontendSelfTypes/moduleProps/CustomInputProps';

export function CustomInput({
  value,
  inputMode,
  onChange,
  autoComplete,
  isPwd,
  keyboardType,
  onFocus,
  onDeFocus,
}: CustomInputProps) {
  const context = useContext(AppSettings);
  const { settings } = context;
  const { theme } = settings;
  return (
    <TextInput
      onFocus={onFocus}
      onBlur={onDeFocus}
      className={`${
        theme === ThemeOptions.dark ? 'text-white' : 'text-black'
      } w-max border-solid border-b-4 ${
        theme === ThemeOptions.dark ? 'border-white' : 'border-black'
      } text-base`}
      autoCorrect={false}
      value={value}
      autoComplete={autoComplete ?? 'off'}
      textContentType={inputMode}
      onChangeText={onChange}
      secureTextEntry={isPwd}
      keyboardType={keyboardType}
    />
  );
}
