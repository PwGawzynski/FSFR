import { Image, View } from 'react-native';
import React from 'react';
import { LogoImageProps } from '../../frontendSelfTypes/moduleProps/LogoImageAnimatedProps';

export function LogoImageCurtain({
  resizeMode,
  additionalBoxStyles,
}: LogoImageProps) {
  return (
    <View className={`w-screen h-1/5 bg-black ${additionalBoxStyles}`}>
      <Image
        resizeMode={resizeMode ?? 'stretch'}
        className="w-full h-full"
        source={require('../../assets/loginBg.png')}
      />
    </View>
  );
}
