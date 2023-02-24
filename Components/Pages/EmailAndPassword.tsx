import { View } from 'react-native';
import { LogoImageCurtain } from '../Atoms/LogoImageCurtain';
import { EmailAndPasswordForm } from '../Organisms/EmailAndPasswordForm';
import { EmailAndPasswordBase } from '../../frontendSelfTypes/navigation/types';

export function EmailAndPassword({ navigation, route }: EmailAndPasswordBase) {
  return (
    <View className="bg-white w-full h-full items-center">
      <LogoImageCurtain />
      <EmailAndPasswordForm navigation={navigation} route={route} />
    </View>
  );
}
