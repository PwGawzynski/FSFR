import { View } from 'react-native';
import React from 'react';
import { OrdersListProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import Orders from './Orders';

export function OrdersList({
  sort,
  filterMethod,
  reloadIndicator,
  ListEmptyComponent,
  abs,
}: OrdersListProps) {
  return (
    <View className={`flex-1 flex flex-col ${abs}`}>
      <Orders
        ListEmptyComponent={ListEmptyComponent}
        reloadIndicator={reloadIndicator}
        sort={sort}
        filterMethod={filterMethod}
      />
    </View>
  );
}
