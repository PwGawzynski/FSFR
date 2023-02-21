import { Image, View } from 'react-native';
import { LogoProps } from '../../frontendSelfTypes/moduleProps/LogoImageAnimatedProps';

export function Logo({
  additionalBoxStyles,
  additionalImageStyles,
  resizeMode,
}: LogoProps) {
  return (
    <View className={`w-full h-full ${additionalBoxStyles}`}>
      <Image
        resizeMode={resizeMode}
        className={`items-center justify-center w-full h-full ${additionalImageStyles}`}
        source={require('../../assets/Logo.png')}
      />
    </View>
  );
}
