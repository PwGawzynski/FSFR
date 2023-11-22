import { Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { ProfilePhoto } from '../Atoms/ProfilePhoto';
import { ActivityProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { UserRole } from '../../FarmServiceTypes/User/Enums';

export function Activity({
  activityType,
  activityLogCauser,
  activityCauserRole,
  taskType,
  client,
  fieldName,
  fieldLocationPlaceName,
  date,
}: ActivityProps) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 600 });
  }, []);
  return (
    <Animated.View
      style={{ opacity }}
      className="flex flex-row items-center mt-2 mb-2"
    >
      <View className="sflex flex-column flex-end">
        <ProfilePhoto />
      </View>
      <View className="flex-1 h-[85] items-center justify-center  ml-4">
        <View className="w-full">
          <Text className="text-black font-bold text-left ml-6 uppercase">
            {activityLogCauser}
            --
            {activityCauserRole === UserRole.Owner ? 'OWNER' : 'WORKER'}
          </Text>
        </View>
        <View className="w-full h-14  bg-black rounded-full">
          <Text className="text-white font-bold text-left ml-6  uppercase">
            {activityType === 1 && 'Started Task:'}
          </Text>
          <Text className="text-white font-bold text-lef ml-6  uppercase">
            {taskType}--{client}
          </Text>
          <Text className="text-white font-bold text-right mr-6  uppercase">
            {fieldName}:{fieldLocationPlaceName}
          </Text>
        </View>
        <View className="w-full">
          <Text className="text-black font-bold uppercase text-right mr-8">
            {date}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}
