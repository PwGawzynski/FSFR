import { Text, View } from 'react-native';
import React from 'react';
import { ProfilePhoto } from '../Atoms/ProfilePhoto';
import { ActivityProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { UserRole } from '../../FarmServiceTypes/User/RegisterNewUserDataDtoInterfaceMobi';

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
  return (
    <View className="flex flex-row items-center mt-2 mb-2">
      <View className="sflex flex-column flex-end">
        <ProfilePhoto />
      </View>
      <View className="flex-1 h-20 items-center justify-center  ml-4">
        <View className="w-full">
          <Text className="text-black font-bold text-left ml-6 uppercase">
            {activityLogCauser}
            --
            {activityCauserRole === UserRole.owner ? 'OWNER' : 'WORKER'}
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
    </View>
  );
}
