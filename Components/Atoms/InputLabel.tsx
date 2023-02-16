import { ReactNode, useContext } from 'react';
import { Text } from 'react-native';
import { AppSettings, ThemeOptions } from '../../helpers/appSettings/contexts';

export interface Props {
  children: ReactNode;
}
export function InputLabel({ children }: Props) {
  const context = useContext(AppSettings);
  const theme = context?.settings.theme;
  return (
    <Text
      className={`${
        theme === ThemeOptions.dark ? 'text-white' : 'text-black'
      } text-sm`}
    >
      {children}
    </Text>
  );
}
