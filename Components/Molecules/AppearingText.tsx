import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import React, { useEffect } from 'react';
import { getFontScaledSize } from '../../helpers/style/fontSize';
import { AppearingTextProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

const ANIMATION_DELAY = 500;
const ANIMATION_DURATION = 3000;
export function AppearingText({
  children,
  onAnimationEnd,
  onUnmountAnimationEnd,
}: AppearingTextProps) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      ANIMATION_DELAY,
      withTiming(1, { duration: ANIMATION_DURATION }),
    );
    if (onAnimationEnd) setTimeout(onAnimationEnd, ANIMATION_DURATION);
    return () => {
      opacity.value = withTiming(0, { duration: ANIMATION_DURATION });
      if (onUnmountAnimationEnd)
        setTimeout(onUnmountAnimationEnd, ANIMATION_DURATION);
    };
  }, []);

  return (
    <Animated.Text
      adjustsFontSizeToFit
      numberOfLines={1}
      testID="appearing-text"
      className="text-center font-semibold"
      style={{ fontSize: getFontScaledSize(24), opacity }}
    >
      {children}
    </Animated.Text>
  );
}
