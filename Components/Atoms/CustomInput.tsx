import React, { useContext } from 'react';
import { TextInput } from 'react-native';
import { AppSettings, ThemeOptions } from '../../helpers/appSettings/contexts';

export interface CustomInputProps {
  value: string;
  onChange: (value: string) => void;
  inputMode?:
    | 'addressCity'
    | 'countryName'
    | 'creditCardNumber'
    | 'emailAddress'
    | 'fullStreetAddress'
    | 'givenName'
    | 'name'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'username'
    | 'password'
    | 'newPassword'
    | 'oneTimeCode';
  autoComplete?:
    | 'username'
    | 'name-given'
    | 'name-middle'
    | 'street-address'
    | 'tel'
    | 'email'
    | 'password'
    | 'postal-code'
    | null;
  isPwd?: boolean;

  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | 'visible-password';
}
export function CustomInput({
  value,
  inputMode,
  onChange,
  autoComplete,
  isPwd,
  keyboardType,
}: CustomInputProps) {
  const context = useContext(AppSettings);
  const { settings } = context;
  const { theme } = settings;

  return (
    <TextInput
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
