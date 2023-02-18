import { Animated } from 'react-native';

export const handleLoginPgAnimation = (
  onOff: boolean,
  elPosition: Animated.Value,
  screenHeight: number,
) => {
  if (onOff)
    Animated.timing(elPosition, {
      toValue: -screenHeight / 5,
      duration: 250,
      useNativeDriver: true,
    }).start();
  else
    Animated.timing(elPosition, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
};
