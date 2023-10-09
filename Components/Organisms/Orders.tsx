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
import { OrdersTopTabParamList } from '../../FrontendSelfTypes/NavigatorsInterfaces/OrdersTopTabParamList';

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

const Orders = memo(
  <T extends keyof OrdersTopTabParamList>({
    navigation,
    sort,
    filterMethod,
  }: OrdersListProps<T>) => {
    const { data: orders } = useQuery<Array<OrderBaseI> | undefined>(
      'orders',
      getAllOrders,
    );
    const ordersDataSorted = sort && orders?.sort(sort);
    const ordersDataFiltered = filterMethod && orders?.filter(filterMethod);
    const RenderItem = ({ item }: OrderListRenderItem) =>
      OrderListItem({ item, navigation });

    return (
      <FlatList
        data={ordersDataSorted || ordersDataFiltered || orders}
        keyExtractor={item => item.taskId}
        renderItem={RenderItem}
        className="flex-1 h-max"
        showsVerticalScrollIndicator={false}
      />
    );
  },
  (prevProps, nextProps) =>
    prevProps.reloadIndicator === nextProps.reloadIndicator,
);

Orders.displayName = 'Orders';
export default Orders;
