import { Animated } from 'react-native';

export const handleLogoImagePgAnimations = (
  onOff: boolean,
  elPosition: Animated.Value,
  el2Position: Animated.Value,
  windowWidth: number,
) => {
  if (onOff) {
    Animated.timing(elPosition, {
      toValue: -windowWidth,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(el2Position, {
      toValue: windowWidth,
      duration: 200,
      useNativeDriver: true,
    }).start();
  } else {
    Animated.timing(elPosition, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(el2Position, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }
};
