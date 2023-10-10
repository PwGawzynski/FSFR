import { View } from 'react-native';
import React from 'react';
import { OrdersListProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import Orders from './Orders';
import { OrdersTopTabParamList } from '../../FrontendSelfTypes/NavigatorsInterfaces/OrdersTopTabParamList';

export function OrdersList<T extends keyof OrdersTopTabParamList>({
  navigation,
  route,
  sort,
  filterMethod,
  reloadIndicator,
  ListEmptyComponent,
}: OrdersListProps<T>) {
  return (
    <View className="flex-1 flex flex-col">
      <Orders
        ListEmptyComponent={ListEmptyComponent}
        reloadIndicator={reloadIndicator}
        navigation={navigation}
        route={route}
        sort={sort}
        filterMethod={filterMethod}
      />
    </View>
  );
}
