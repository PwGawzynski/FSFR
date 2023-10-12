import { View } from 'react-native';
import React from 'react';
import { OrdersListProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import Orders from './Orders';
import { OrdersTopTabParamList } from '../../FrontendSelfTypes/NavigatorsInterfaces/OrdersTopTabParamList';
import { MaterialOrdersRootTopTabParamList } from '../../FrontendSelfTypes/NavigatorsInterfaces/MaterialOrdersRootTopTabParamLIst';
import { OwnerDesktopRootStackParamList } from '../../FrontendSelfTypes/NavigatorsInterfaces/OwnerDesktopRootStackParamList';

export function OrdersList<
  T extends keyof MaterialOrdersRootTopTabParamList,
  N extends keyof OrdersTopTabParamList,
  M extends keyof OwnerDesktopRootStackParamList,
>({
  navigation,
  route,
  sort,
  filterMethod,
  reloadIndicator,
  ListEmptyComponent,
}: OrdersListProps<T, N, M>) {
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
