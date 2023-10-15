import { Image, View } from 'react-native';
import React from 'react';
import { LogoImageProps } from '../../frontendSelfTypes/moduleProps/ComponentsProps';

export function LogoImage({ resizeMode, abs }: LogoImageProps) {
  return (
    <View className={`w-screen h-1/5 bg-black ${abs}`}>
      <Image
        resizeMode={resizeMode ?? 'stretch'}
        className="w-full h-full"
        source={require('../../assets/logoBgImage.jpg')}
      />
    </View>
  );
}
