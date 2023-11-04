import { useContext } from 'react';
import { Text } from 'react-native';
import { AppSettings, ThemeOptions } from '../../helpers/appSettings/contexts';
import { InputLabelProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function InputLabel({ children }: InputLabelProps) {
  const context = useContext(AppSettings);
  const theme = context?.settings.theme;
  return (
    <Text
      className={`${
        theme === ThemeOptions.dark ? 'text-white' : 'text-[#848484]'
      } text-sm`}
    >
      {children}
    </Text>
  );
}
