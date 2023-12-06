import { Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { ProfilePhoto } from '../Atoms/ProfilePhoto';
import { NotificationsResponseBase } from '../../FarmServiceTypes/Notification/Responses';
import { EventType } from '../../FarmServiceTypes/Notification/Enums';

export function Activity({
  id,
  causer,
  createdAt,
  shortInfo,
  description,
  eventType,
}: NotificationsResponseBase) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 600 });
  }, []);
  return (
    <Animated.View
      style={{ opacity }}
      className="flex flex-row items-center mt-2 mb-2"
      key={id}
    >
      <View className="sflex flex-column flex-end">
        <ProfilePhoto />
      </View>
      <View className="flex-1 h-[85] items-center justify-center  ml-4">
        <View className="w-full">
          <Text className="text-black font-bold text-left ml-6 uppercase">
            {causer.name} {causer.surname}
            -- WORKER
          </Text>
        </View>
        <View className="w-full h-14  bg-black rounded-full">
          <Text className="text-white font-bold text-left ml-6  uppercase">
            {EventType[eventType]}
          </Text>
          <Text className="text-white font-bold text-lef ml-6  uppercase">
            {eventType === EventType.TaskOpened
              ? `Yours worker already start task`
              : `Yours worker done  task`}
          </Text>
          <Text className="text-white font-bold text-right mr-6  uppercase">
            {shortInfo}
          </Text>
        </View>
        <View className="w-full">
          <Text className="text-black font-bold uppercase text-right mr-8">
            {new Date(createdAt ?? new Date()).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}
