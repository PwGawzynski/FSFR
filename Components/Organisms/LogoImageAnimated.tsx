import { Animated, Dimensions, Image, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { LogoImageAnimatedProps } from '../../frontendSelfTypes/moduleProps/LogoImageAnimatedProps';
import { handleLogoImagePgAnimations } from '../../helpers/handlers/LogoImageAnimatedHandlers';

export function LogoImageAnimated({ onOff }: LogoImageAnimatedProps) {
  const elPosition = useRef(new Animated.Value(0)).current;
  const el2Position = useRef(new Animated.Value(0)).current;
  const windowWidth = Dimensions.get('window').width;
  useEffect(() => {
    handleLogoImagePgAnimations(onOff, elPosition, el2Position, windowWidth);
  }, [onOff, windowWidth, elPosition, el2Position]);
  return (
    <View className="w-screen h-1/5">
      <Animated.View
        className="w-screen h-full"
        style={{
          transform: [
            {
              translateX: elPosition,
            },
          ],
        }}
      >
        <Image
          resizeMode="stretch"
          className="w-full h-full"
          source={require('../../assets/loginBg.png')}
        />
      </Animated.View>
      <Animated.View
        className="w-screen h-full absolute top-0 left-0"
        style={{
          transform: [
            {
              translateX: el2Position,
            },
          ],
        }}
      >
        <Image
          resizeMode="stretch"
          className="w-full h-full"
          source={require('../../assets/loginBg.png')}
        />
      </Animated.View>
    </View>
  );
}
