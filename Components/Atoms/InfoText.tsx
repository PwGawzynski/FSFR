import { Text } from 'react-native';
import { useContext } from 'react';
import { AppSettings, ThemeOptions } from '../../helpers/appSettings/contexts';
import { InfoTextProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function InfoText({ children, abs }: InfoTextProps) {
  const context = useContext(AppSettings);
  const theme = context?.settings.theme;
  return (
    <Text
      className={`${
        theme === ThemeOptions.dark ? 'text-white' : 'text-black'
      } text-center w-full  ${abs}`}
    >
      {children}
    </Text>
  );
}
