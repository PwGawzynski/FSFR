import { View } from 'react-native';
import React from 'react';
import { OrdersListProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import Orders from './Orders';

export function OrdersList({ navigation, route, sort }: OrdersListProps) {
  return (
    <View className="flex-1 flex flex-col">
      <Orders navigation={navigation} route={route} sort={sort} />
    </View>
  );
}
