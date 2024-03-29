import React, { useContext } from 'react';
import { TextInput, View } from 'react-native';
import { InputLabel } from '../Atoms/InputLabel';
import { AppSettings, ThemeOptions } from '../../helpers/appSettings/contexts';
import { AppInputProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function AppInput<T extends object>({
  inputMode,
  setter,
  value,
  autoComplete,
  underlyingLabel,
  ObjectKey,
  isPwd,
  abs,
  keyboardType,
  onFocus,
  onDeFocus,
  refGetter,
  onSubmit,
  maxLength,
  ats,
  keyboardHideOnSubmit,
  autoFocus,
}: AppInputProps<T>) {
  const context = useContext(AppSettings);
  const { settings } = context;
  const { theme } = settings;
  return (
    <View className={`w-full  ${abs}`}>
      <TextInput
        autoFocus={autoFocus}
        blurOnSubmit={keyboardHideOnSubmit}
        maxLength={maxLength}
        ref={refGetter}
        onFocus={onFocus ? e => onFocus(e) : undefined}
        onSubmitEditing={onSubmit}
        onBlur={onDeFocus}
        className={`${
          theme === ThemeOptions.dark ? 'text-white' : 'text-black'
        } w-max border-solid border-b-4 ${
          theme === ThemeOptions.dark ? 'border-white' : 'border-black'
        } text-lg pb-2 h-14 ${ats}`}
        autoCorrect={false}
        value={value}
        autoComplete={autoComplete ?? 'off'}
        textContentType={inputMode}
        onChangeText={txt =>
          setter(prev => ({
            ...prev,
            [ObjectKey]: txt,
          }))
        }
        secureTextEntry={isPwd}
        keyboardType={keyboardType}
      />
      <InputLabel>{underlyingLabel}</InputLabel>
    </View>
  );
}
