import { ScrollView } from 'react-native';
import React from 'react';
import { useQuery } from 'react-query';
import { OrderShortInfoBox } from '../Molecules/OrderShortInfoBox';
import { OrderBaseI } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { getAllOrders } from '../../helpers/api/Services/OrdersService';

export function Orders() {
  const { data: orders } = useQuery<Array<OrderBaseI> | undefined>(
    'orders',
    getAllOrders,
  );

  return (
    <ScrollView className="flex-1 h-max" showsVerticalScrollIndicator={false}>
      {orders?.map(order => (
        <OrderShortInfoBox
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
