import { View } from 'react-native';
import React from 'react';
import { AppButton } from '../Atoms/AppButton';
import { OwnerOrdersMaterialRootProps } from '../../FrontendSelfTypes/navigation/types';
import { MagnifierButton } from './MagnifierButton';

export function OrdersRootScreenTopBarButtons({
  navigation,
}: OwnerOrdersMaterialRootProps<'materialOrdersRoot', 'ordersRoot', 'orders'>) {
  return (
    <View className="flex-1 flex items-center w-full flex-row">
      <AppButton
        action={() => navigation.navigate('ordersHistory')}
        context="History"
        abs="flex-1 h-8 mr-32"
      />
      <View className="flex-1 flex-row items-center">
        <AppButton
          action={() => navigation.navigate('allOrders')}
          context="All"
          abs="flex-1 h-8 bg-[#279840]"
        />
        <MagnifierButton onPress={() => navigation.navigate('ordersSearch')} />
      </View>
    </View>
  );
}
