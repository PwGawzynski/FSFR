import { View } from 'react-native';
import { LogoImageCurtain } from '../Atoms/LogoImageCurtain';
import { RegisterMobiPropsBase } from '../../frontendSelfTypes/navigation/types';
import { AddressesForm } from '../Organisms/AddressesForm';

export function AddressesData({
  navigation,
  route,
}: RegisterMobiPropsBase<'Addresses'>) {
  return (
    <View className="bg-white w-full h-full items-center">
      <LogoImageCurtain />
      <AddressesForm navigation={navigation} route={route} />
    </View>
  );
}
