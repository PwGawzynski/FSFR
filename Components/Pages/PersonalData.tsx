import { View } from 'react-native';
import { LogoImageCurtain } from '../Atoms/LogoImageCurtain';
import { PersonalDataBase } from '../../frontendSelfTypes/navigation/types';
import { PersonalDataForm } from '../Organisms/PersonalDataForm';

export function PersonalData({ navigation, route }: PersonalDataBase) {
  return (
    <View className="bg-white w-full h-full items-center">
      <LogoImageCurtain />
      <PersonalDataForm navigation={navigation} route={route} />
    </View>
  );
}
