import { View } from 'react-native';
import { LogoImageCurtain } from '../Atoms/LogoImageCurtain';
import { RegisterMobiPropsBase } from '../../frontendSelfTypes/navigation/types';
import { ContactPhonesForm } from '../Organisms/ContactPhonesForm';

export function ContactPhones({
  navigation,
  route,
}: RegisterMobiPropsBase<'ContactPhones'>) {
  return (
    <View className="bg-white w-full h-full items-center">
      <LogoImageCurtain />
      <ContactPhonesForm navigation={navigation} route={route} />
    </View>
  );
}
