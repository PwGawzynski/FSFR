import { Text } from 'react-native';
import { ReactNode, useContext } from 'react';
import { AppSettings, ThemeOptions } from '../../helpers/appSettings/contexts';

interface Props {
  children: ReactNode;

  additionalStyles?: string;
}

export function InfoText({ children, additionalStyles }: Props) {
  const context = useContext(AppSettings);
  const theme = context?.settings.theme;
  return (
    <Text
      className={`${
        theme === ThemeOptions.dark ? 'text-white' : 'text-black'
      } text-center w-full  ${additionalStyles}`}
    >
      {children}
    </Text>
  );
}
