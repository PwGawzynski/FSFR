import { Text, TouchableHighlight, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import {
  TaskType,
  WorkerTaskListElement,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { RemoveSwipeUnderlying } from '../Atoms/RemoveSwipeUnderlying';
import { getFontScaledSize } from '../../helpers/style/fontSize';

export function WorkersTaskListElement({ field, type }: WorkerTaskListElement) {
  return (
    <Swipeable
      onSwipeableOpen={direction => console.log('test', direction)}
      renderLeftActions={RemoveSwipeUnderlying}
    >
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
  );
}
