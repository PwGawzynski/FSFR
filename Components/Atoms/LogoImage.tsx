import { Image, View } from 'react-native';
import React from 'react';
import { LogoImageProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function LogoImage({ resizeMode, abs }: LogoImageProps) {
  return (
    <View
      testID="logo-image-container"
      className={`w-screen h-1/5 bg-black ${abs}`}
    >
      <Image
        testID="logo-image"
        resizeMode={resizeMode ?? 'stretch'}
        className="w-full h-full"
        source={require('../../assets/logoBgImage.jpg')}
      />
    </View>
  );
}
