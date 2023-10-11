import { SafeAreaView } from 'react-native';
import React from 'react';
import { OrdersRootScreenTopBar } from '../../../../Organisms/OrdersRootScreenTopBar';
import { OrdersList } from '../../../../Organisms/OrdersList';
import { OwnerMobiOrdersTopTabProps } from '../../../../../FrontendSelfTypes/navigation/types';
import { SmallHeader } from '../../../../Molecules/SmallHeader';
import { UpcomingOrdersFilter } from '../../../../../helpers/handlers/ordersFilterHandler';

export function OrdersRoot({
  route,
  navigation,
}: OwnerMobiOrdersTopTabProps<'ordersRoot', 'orders'>) {
  return (
    <SafeAreaView className="flex flex-col h-full w-ful  ml-4 mr-4 mt-4">
      <OrdersRootScreenTopBar navigation={navigation} route={route} />
      <SmallHeader>Upcoming Orders</SmallHeader>
      <OrdersList
        navigation={navigation}
        route={route}
        filterMethod={UpcomingOrdersFilter}
        sort={(a, b) =>
          new Date(a.performanceDate).getTime() >=
          new Date(b.performanceDate).getTime()
            ? 1
            : -1
        }
      />
    </SafeAreaView>
  );
}
