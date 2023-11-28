import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TaskResponseBase } from '../../FarmServiceTypes/Task/Restonses';
import { TaskType } from '../../FarmServiceTypes/Task/Enums';

export function TaskShortInfoBox({
  id,
  isDone,
  type,
  field,
  worker,
  openedAt,
  closedAt,
}: TaskResponseBase) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('task', {
          task: {
            id,
            isDone,
            type,
            field,
            worker,
            openedAt,
            closedAt,
          },
        })
      }
      className={`w-max h-[130] flex flex-row rounded-2xl border-dotted ${
        isDone ? 'border-[#848484]' : 'border-black'
      } border-2 mb-8`}
    >
      <View
        className={`w-1/2 h-8 items-center justify-center ${
          isDone ? 'bg-[#848484]' : 'bg-black'
        } absolute top-28 left-1/4 rounded-full`}
      >
        <Text className="text-lg font-bold text-white uppercase">More</Text>
      </View>
      <View className="flex-col flex-1 flex">
        <View className="flex-1 items-start justify-center ml-2">
          <Text className="text-center font-bold text-lg uppercase">Type</Text>
        </View>
        <View className="flex-1 items-start justify-center ml-2">
          <Text className="text-center font-bold text-lg uppercase">PLID</Text>
        </View>
        <View className="flex-1 items-start justify-center ml-2 mb-1">
          <Text className="text-center font-bold text-lg uppercase">
            Location
          </Text>
        </View>
      </View>
      <View className="flex-col flex-1 flex">
        <View className="flex-1 items-end justify-center mr-2">
          <Text className="text-center font-bold text-lg uppercase">
            {TaskType[type]}
          </Text>
        </View>
        <View className="flex-1 items-end justify-center mr-2">
          <Text className="text-center font-bold text-lg uppercase">
            {field.polishSystemId}
          </Text>
        </View>
        <View className="flex-1 items-end justify-center mr-2 mb-1">
          <Text className="text-center font-bold text-lg uppercase">
            {field.address.city}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
