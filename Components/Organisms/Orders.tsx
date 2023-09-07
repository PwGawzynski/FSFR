import { ScrollView } from 'react-native';
import React from 'react';
import { useQuery } from 'react-query';
import { OrderShortInfoBox } from '../Molecules/OrderShortInfoBox';
import { OrderBaseI } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { getAllOrders } from '../../helpers/api/Services/OrdersService';
import { OwnerMobiOrdersTopTabProps } from '../../FrontendSelfTypes/navigation/types';

export function Orders({
  navigation,
}: OwnerMobiOrdersTopTabProps<'ordersRoot', 'orders'>) {
  const { data: orders } = useQuery<Array<OrderBaseI> | undefined>(
    'orders',
    getAllOrders,
  );

  return (
    <ScrollView className="flex-1 h-max" showsVerticalScrollIndicator={false}>
      {orders?.map(order => (
        <OrderShortInfoBox
          area={order.area}
          status={order.status}
          doneArea={order.doneArea}
          navigation={navigation}
          key={order.taskId}
          taskId={order.taskId}
          name={order.name}
          type={order.type}
          additionalInfo={order.additionalInfo}
          performanceDate={order.performanceDate}
          clientId={order.clientId}
          client={order.client}
        />
      ))}
    </ScrollView>
  );
}
