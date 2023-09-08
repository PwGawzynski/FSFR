import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import DangerIco from '../../assets/danger.svg';

export function DangerAlarmIcon() {
  const opacity = useSharedValue(0);
  const easing = Easing.bezier(0.25, -0.5, 0.25, 1);
  const animated = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 800, easing }), -1);
  }, []);
  return (
    <View className="grow flex items-center justify-center">
      <Animated.View style={[animated]}>
        <DangerIco fill="#F00" style={{ width: 150, height: 150 }} />
      </Animated.View>
    </View>
  );
}
