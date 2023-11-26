import { ControllerRenderProps } from 'react-hook-form/dist/types/controller';
import { FieldPath, FieldValues } from 'react-hook-form/dist/types';
import { TextInput, View } from 'react-native';
import { useContext } from 'react';
import { AppSettings, ThemeOptions } from '../../helpers/appSettings/contexts';

export type AppInputRhfProps<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues = FieldValues,
> = {
  controllers: { field: ControllerRenderProps<TFieldValues, TName> };
  abs?: string;
};

export function AppInputRhf<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues = FieldValues,
>({
  controllers: {
    field: { onBlur, onChange, value, ref, name, disabled },
  },
  abs,
}: AppInputRhfProps<TName, TFieldValues>) {
  const context = useContext(AppSettings);
  const { settings } = context;
  const { theme } = settings;

  return (
    <View className={`w-full ${abs}`}>
      <TextInput
        className={`${
          theme === ThemeOptions.dark ? 'text-white' : 'text-black'
        } w-max border-solid border-b-4 ${
          theme === ThemeOptions.dark ? 'border-white' : 'border-black'
        } text-lg pb-2 h-14 `}
        onBlur={onBlur}
        ref={ref}
        placeholder={name}
        editable={disabled}
        onChangeText={onChange}
        value={value}
      />
    </View>
  );
}
