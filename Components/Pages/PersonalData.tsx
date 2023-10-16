import { View } from 'react-native';
import { LogoImageCurtain } from '../Atoms/LogoImageCurtain';
import { PersonalDataForm } from '../Organisms/PersonalDataForm';
import { RegisterMobiPropsBase } from '../../FrontendSelfTypes/navigation/types';

export function PersonalData({
  navigation,
  route,
}: RegisterMobiPropsBase<'PersonalData'>) {
  return (
    <View className="bg-white w-full h-full items-center">
      <LogoImageCurtain />
      <PersonalDataForm navigation={navigation} route={route} />
    </View>
  );
}
