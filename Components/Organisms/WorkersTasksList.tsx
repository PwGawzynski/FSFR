import {
  Animated,
  FlatList,
  PixelRatio,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import {
  TaskType,
  WorkersTaskList,
  WorkerTaskListElement,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import TrashIco from '../../assets/trash.svg';

type AnimatedInterpolation = ReturnType<Animated.Value['interpolate']>;
function WorkersTaskListElement({ field, type }: WorkerTaskListElement) {
  const fontScale = PixelRatio.getFontScale();
  const getFontSize = (size: number) => size / fontScale;

  const swipeUnderlying = (
    progressAnimatedValue: AnimatedInterpolation,
    dragAnimatedValue: AnimatedInterpolation,
  ) => {
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
            { width: '20%', height: '70%' },
            { transform: [{ scale: trans }] },
          ]}
        >
          <TrashIco fill="#fff" />
        </Animated.View>
      </View>
    );
  };

  return (
    <Swipeable renderLeftActions={swipeUnderlying}>
      <TouchableHighlight
        underlayColor="#848484"
        activeOpacity={1}
        onPress={() => console.log('pres')}
        className="flex-1 h-16 flex flex-col bg-white justify-center rounded "
      >
        <View className="grow justify-center">
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={{ fontSize: getFontSize(18) }}
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
  );
}
export function WorkersTasksList({ data }: WorkersTaskList) {
  return (
    <FlatList
      className=""
      data={data}
      renderItem={({ item, index }) =>
        WorkersTaskListElement({ ...item, index })
      }
    />
  );
}
