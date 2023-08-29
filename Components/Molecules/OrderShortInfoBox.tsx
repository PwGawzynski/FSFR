import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {
  OrderProps,
  TaskType,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function OrderShortInfoBox({
  type,
  client,
  performanceDate,
}: OrderProps) {
  return (
    <View className="w-max h-32 flex flex-row rounded-2xl border-dotted border-black border-2 mb-8">
      <TouchableOpacity className="w-1/2 h-8 items-center justify-center bg-black absolute top-28 left-1/4 rounded-full">
        <Text className="text-lg font-bold text-white uppercase">More</Text>
      </TouchableOpacity>
      <View className="flex-col flex-1 flex">
        <View className="flex-1 items-start justify-center ml-2">
          <Text className="text-center font-bold text-lg uppercase">Type</Text>
        </View>
        <View className="flex-1 items-start justify-center ml-2">
          <Text className="text-center font-bold text-lg uppercase">
            Client
          </Text>
        </View>
        <View className="flex-1 items-start justify-center ml-2">
          <Text className="text-center font-bold text-lg uppercase">
            Performance date
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
            {client}
          </Text>
        </View>
        <View className="flex-1 items-end justify-center mr-2">
          <Text className="text-center font-bold text-lg uppercase">
            {performanceDate}
          </Text>
        </View>
      </View>
    </View>
  );
}
