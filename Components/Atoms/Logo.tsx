import { Image, View } from 'react-native';
import { LogoProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function Logo({ abs, additionalImageStyles, resizeMode }: LogoProps) {
  return (
    <View testID="logo" className={`w-full h-full ${abs}`}>
      <Image
        resizeMode={resizeMode}
        className={`items-center justify-center w-full h-full ${additionalImageStyles}`}
        source={require('../../assets/Logo.png')}
      />
    </View>
  );
}
