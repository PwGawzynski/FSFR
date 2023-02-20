import { Image, View } from 'react-native';
import React from 'react';

export function LogoImage() {
  return (
    <View className="w-screen h-1/5 bg-black">
      <Image
        resizeMode="stretch"
        className="w-full h-full"
        source={require('../../assets/loginBg.png')}
      />
    </View>
  );
}
