import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { OrderProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { OrderStatus, ServiceType } from '../../FarmServiceTypes/Order/Enums';

export function OrderShortInfoBox({
  openedAt,
  createdAt,
  serviceType,
  pricePerUnit,
  additionalInfo,
  name,
  totalArea,
  id,
  performanceDate,
  status,
}: OrderProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('orderDetails', { orderId: id })}
      className={`w-max h-[130] flex flex-row rounded-2xl border-dotted ${
        status === OrderStatus.Done ? 'border-[#848484]' : 'border-black'
      } border-2 mb-8`}
    >
      <View
        className={`w-1/2 h-8 items-center justify-center ${
          status === OrderStatus.Done ? 'bg-[#848484]' : 'bg-black'
        } absolute top-28 left-1/4 rounded-full`}
      >
        <Text className="text-lg font-bold text-white uppercase">More</Text>
      </View>
      <View className="flex-col flex-1 flex">
        <View className="flex-1 items-start justify-center ml-2">
          <Text className="text-center font-bold text-lg uppercase">Type</Text>
        </View>
        <View className="flex-1 items-start justify-center ml-2">
          <Text className="text-center font-bold text-lg uppercase">Name</Text>
        </View>
        <View className="flex-1 items-start justify-center ml-2 mb-1">
          <Text className="text-center font-bold text-lg uppercase">
            Performance date
          </Text>
        </View>
      </View>
      <View className="flex-col flex-1 flex">
        <View className="flex-1 items-end justify-center mr-2">
          <Text className="text-center font-bold text-lg uppercase">
            {ServiceType[serviceType]}
          </Text>
        </View>
        <View className="flex-1 items-end justify-center mr-2">
          <Text className="text-center font-bold text-lg uppercase">
            {name}
          </Text>
        </View>
        <View className="flex-1 items-end justify-center mr-2 mb-1">
          <Text className="text-center font-bold text-lg uppercase">
            {new Date(performanceDate).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
