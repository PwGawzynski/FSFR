import { Animated, View } from 'react-native';
import TrashIco from '../../assets/trash.svg';

type AnimatedInterpolation = ReturnType<Animated.Value['interpolate']>;

export function RemoveSwipeUnderlying(
  progressAnimatedValue: AnimatedInterpolation,
  dragAnimatedValue: AnimatedInterpolation,
) {
  const trans = dragAnimatedValue.interpolate({
    inputRange: [0, 50],
    outputRange: [0.01, 0.1],
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
            height: '70%',
          },
          { transform: [{ scale: trans }] },
        ]}
      >
        <TrashIco fill="#fff" />
      </Animated.View>
    </View>
  );
}
