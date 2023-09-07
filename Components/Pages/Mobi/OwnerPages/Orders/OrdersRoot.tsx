import { SafeAreaView } from 'react-native';
import React from 'react';
import { OrdersRootScreenTopBar } from '../../../../Organisms/OrdersRootScreenTopBar';
import { OrdersShortInfoBoxList } from '../../../../Organisms/OrdersShortInfoBoxList';
import { OwnerMobiOrdersTopTabProps } from '../../../../../FrontendSelfTypes/navigation/types';

export function OrdersRoot({
  route,
  navigation,
}: OwnerMobiOrdersTopTabProps<'ordersRoot', 'orders'>) {
  return (
    <SafeAreaView className="flex flex-col h-full w-ful  ml-4 mr-4 mt-4">
      <OrdersRootScreenTopBar navigation={navigation} route={route} />
      <OrdersShortInfoBoxList navigation={navigation} route={route} />
    </SafeAreaView>
  );
}
