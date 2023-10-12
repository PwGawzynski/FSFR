import { View } from 'react-native';
import React from 'react';
import { OrdersRootScreenTitle } from '../Atoms/OrdersRootScreenTitle';
import { OrdersRootScreenTopBarButtons } from '../Molecules/OrdersRootScreenTopBarButtons';
import { OwnerOrdersMaterialRootProps } from '../../FrontendSelfTypes/navigation/types';

export function OrdersRootScreenTopBar({
  route,
  navigation,
}: OwnerOrdersMaterialRootProps<'materialOrdersRoot', 'ordersRoot', 'orders'>) {
  return (
    <View className="flex flex-col w-ful h-1/6 justify-center">
      <OrdersRootScreenTitle />
      <OrdersRootScreenTopBarButtons navigation={navigation} route={route} />
    </View>
  );
}
