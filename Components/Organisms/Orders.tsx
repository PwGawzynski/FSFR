import { FlatList } from 'react-native';
import React, { memo } from 'react';
import { useQuery } from 'react-query';
import { OrderShortInfoBox } from '../Molecules/OrderShortInfoBox';
import {
  OrderBaseI,
  OrderListItemI,
  OrderListRenderItem,
  OrdersListProps,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { getAllOrders } from '../../helpers/api/Services/OrdersService';

function OrderListItem({ item: order, navigation }: OrderListItemI) {
  return (
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
  );
}

const Orders = memo(({ navigation, sort }: OrdersListProps) => {
  console.log('OrdersListRerender');
  const { data: orders } = useQuery<Array<OrderBaseI> | undefined>(
    'orders',
    getAllOrders,
  );
  const ordersData = sort ? orders?.sort(sort) : orders;
  const RenderItem = ({ item }: OrderListRenderItem) =>
    OrderListItem({ item, navigation });

  return (
    <FlatList
      data={ordersData}
      keyExtractor={item => item.taskId}
      renderItem={RenderItem}
      className="flex-1 h-max"
      showsVerticalScrollIndicator={false}
    />
  );
});

Orders.displayName = 'Orders';
export default Orders;
