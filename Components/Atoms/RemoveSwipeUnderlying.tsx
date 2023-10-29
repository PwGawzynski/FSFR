import { Animated, Dimensions, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import React from 'react';
import TrashIco from '../../assets/trash.svg';

type AnimatedInterpolation = ReturnType<Animated.Value['interpolate']>;

export function RemoveSwipeUnderlying(
  progressAnimatedValue: AnimatedInterpolation,
  dragAnimatedValue: AnimatedInterpolation,
  willOpen: React.MutableRefObject<boolean>,
) {
  const trans = dragAnimatedValue.interpolate({
    inputRange: [0, 300],
    outputRange: [0.5, 1],
  });
  const leftSwipeThresholdWidth = Dimensions.get('window').width * 0.25;
  let isOpen = false;
  dragAnimatedValue.addListener(({ value }) => {
    if (
      Number(Number(value).toFixed()) >= leftSwipeThresholdWidth &&
      !isOpen &&
      !willOpen.current
    ) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      isOpen = true;
      // this value is transmitted as ref so we can do assignation
      // eslint-disable-next-line no-param-reassign
      willOpen.current = true;
    } else if (
      Number(Number(value).toFixed()) < leftSwipeThresholdWidth &&
      isOpen
    ) {
      isOpen = false;
      // this value is transmitted as ref so we can do assignation
      // eslint-disable-next-line no-param-reassign
      willOpen.current = false;
    }
  });
  return (
    <View
      className="rounded"
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f00',
      }}
    >
      <Animated.View
        style={[
          {
            width: '20%',
            height: '50%',
          },
          { transform: [{ scale: trans }] },
        ]}
      >
        <TrashIco fill="#fff" />
      </Animated.View>
    </View>
  );
}
