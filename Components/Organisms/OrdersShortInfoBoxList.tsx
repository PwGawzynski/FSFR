import { Text, View } from 'react-native';
import React from 'react';
import { Orders } from './Orders';
import { OwnerMobiOrdersTopTabProps } from '../../FrontendSelfTypes/navigation/types';

export function OrdersShortInfoBoxList({
  navigation,
  route,
}: OwnerMobiOrdersTopTabProps<'ordersRoot', 'orders'>) {
  return (
    <View className="flex-1 flex flex-col">
      <View className="h-9">
        <Text className="w-max text-medium uppercase font-bold">
          Upcoming Orders
        </Text>
      </View>
      <Orders navigation={navigation} route={route} />
    </View>
  );
}
