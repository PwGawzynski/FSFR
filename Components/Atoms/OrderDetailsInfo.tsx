import { Text, View } from 'react-native';
import {
  OrderDetailsInfoProps,
  OrderStats,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function OrderDetailsInfo({ order }: OrderDetailsInfoProps) {
  return (
    <View className="flex flex-col ">
      <View className="flex flex-row mt-2">
        <Text className="flex-1 uppercase text-lg font-bold text-left">
          Purchaser
        </Text>
        <Text className="flex-1 uppercase text-lg  text-right">
          {order.client}
        </Text>
      </View>
      <View className="flex flex-row mt-2">
        <Text className="flex-1 uppercase text-lg font-bold text-left">
          Performance Date
        </Text>
        <Text className="flex-1 uppercase text-lg  text-right">
          {order.performanceDate}
        </Text>
      </View>
      <View className="flex flex-row mt-2">
        <Text className="flex-1 uppercase text-lg font-bold text-left">
          Area
        </Text>
        <Text className="flex-1 uppercase text-lg  text-right">
          {order.area}
        </Text>
      </View>
      <View className="flex flex-row mt-2">
        <Text className="flex-1 uppercase text-lg font-bold text-left">
          Status
        </Text>
        <Text className="flex-1 uppercase text-lg  text-right">
          {OrderStats[order.status]}
        </Text>
      </View>
      <View className="flex flex-row mt-2">
        <Text className="flex-1 uppercase text-lg font-bold text-left">
          Rest Area
        </Text>
        <Text className="flex-1 uppercase text-lg  text-right">
          {(order.area - order.doneArea).toFixed(2)}
        </Text>
      </View>
    </View>
  );
}
