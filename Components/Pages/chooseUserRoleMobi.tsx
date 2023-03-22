import { View } from 'react-native';
import { LogoImageCurtain } from '../Atoms/LogoImageCurtain';
import { RegisterMobiPropsBase } from '../../frontendSelfTypes/navigation/types';
import Icom from '../../assets/user.svg';

export function ChooseUserRoleMobi({
  navigation,
  route,
}: RegisterMobiPropsBase<'ChooseUserRole'>) {
  return (
    <View className="bg-white w-full h-full items-center">
      <LogoImageCurtain />
      <Icom />
    </View>
  );
}
