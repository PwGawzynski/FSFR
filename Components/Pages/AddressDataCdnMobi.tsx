import { View } from 'react-native';
import { LogoImageCurtain } from '../Atoms/LogoImageCurtain';
import { RegisterMobiPropsBase } from '../../frontendSelfTypes/navigation/types';
import { AddressFormCdn } from '../Organisms/AddressFormCdn';

export function AddressDataCdnMobi({
  navigation,
  route,
}: RegisterMobiPropsBase<'AddressesCdn'>) {
  return (
    <View className="bg-white w-full h-full items-center">
      <LogoImageCurtain />
      <AddressFormCdn navigation={navigation} route={route} />
    </View>
  );
}
