import { View } from 'react-native';
import { LogoImageCurtain } from '../Atoms/LogoImageCurtain';
import { AddressFormCdn } from '../Organisms/AddressFormCdn';
import { RegisterMobiPropsBase } from '../../FrontendSelfTypes/navigation/types';

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
