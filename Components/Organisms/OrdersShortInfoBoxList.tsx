import { Text, View } from 'react-native';
import React from 'react';
import { Orders } from './Orders';

export function OrdersShortInfoBoxList() {
  return (
    <View className="flex-1 flex flex-col">
      <View className="h-9">
        <Text className="w-max text-medium uppercase font-bold">
          Upcoming Orders
        </Text>
      </View>
      <Orders />
    </View>
  );
}
