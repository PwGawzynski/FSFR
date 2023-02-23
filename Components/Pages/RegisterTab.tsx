import { View, Animated, Dimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { RegisterFormTab } from '../Organisms/RegisterFormTab';
import { RegisterTabProps } from '../../frontendSelfTypes/moduleProps/ComponentsProps';
import { LogoImage } from '../Atoms/LogoImage';

export function RegisterTab({ navigation }: RegisterTabProps) {
  const [isFocused, setFocused] = useState<boolean>(false);
  const deviceHeight = Dimensions.get('window').height;
  const imgHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isFocused) {
      Animated.timing(imgHeight, {
        toValue: -(deviceHeight / 3),
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(imgHeight, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }
  }, [isFocused, deviceHeight, imgHeight]);

  return (
    <View className="w-max h-screen bg-white top-0 flex flex-row">
      <Animated.View
        className="w-1/3 relative"
        style={{
          top: imgHeight,
        }}
      >
        <LogoImage additionalBoxStyles="w-full h-full" resizeMode="cover" />
      </Animated.View>
      <View className="flex-1  items-center">
        <RegisterFormTab
          isFocused
          setFocused={setFocused}
          navigation={navigation}
        />
      </View>
    </View>
  );
}
