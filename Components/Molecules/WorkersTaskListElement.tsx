import { Dimensions, Text, TouchableHighlight, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useEffect, useRef, useState } from 'react';
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  TaskType,
  WorkerTaskListElement,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { RemoveSwipeUnderlying } from '../Atoms/RemoveSwipeUnderlying';
import { getFontScaledSize } from '../../helpers/style/fontSize';

export function WorkersTaskListElement({
  field,
  type,
  id,
  onRemoveTask,
}: WorkerTaskListElement) {
  const animated = useSharedValue(1);
  const [visible, setVisible] = useState(true);
  const screenWidth = Dimensions.get('screen').width;
  const open = useRef(false);
  useEffect(() => {
    if (!visible)
      animated.value = withTiming(0, {
        duration: 400,
        easing: Easing.poly(2),
      });
  }, [visible, animated]);

  return (
    <Animated.View style={{ transform: [{ scale: animated }] }} key={id}>
      <Swipeable
        leftThreshold={screenWidth * 0.25}
        onSwipeableOpen={direction => {
          if (direction === 'left') {
            onRemoveTask(id);
            setVisible(false);
          }
        }}
        renderLeftActions={(progressAnimatedValue, dragAnimatedValue) =>
          RemoveSwipeUnderlying(progressAnimatedValue, dragAnimatedValue, open)
        }
      >
        <TouchableHighlight
          underlayColor="#848484"
          activeOpacity={1}
          onPress={() => ''}
          className="flex-1 h-16 flex flex-col bg-white justify-center rounded "
        >
          <View className="grow justify-center">
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={{ fontSize: getFontScaledSize(18) }}
              className="font-bold leading-none"
            >
              {TaskType[type]}
            </Text>
            <View className="flex-row flex w-full justify-between">
              <Text>
                ID:{' '}
                {field.fieldId.split('-')[field.fieldId.split('-').length - 1]}
              </Text>
              <Text>{field.name}</Text>
              <Text className="text-right">{field.area}Ha</Text>
            </View>
          </View>
        </TouchableHighlight>
      </Swipeable>
    </Animated.View>
  );
}
