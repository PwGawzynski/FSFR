import { FlatList } from 'react-native';
import React, { Component, FunctionComponent, memo } from 'react';
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
import { LoadingAnimation } from '../Atoms/LoadingAnimation';
import { MaterialOrdersRootTopTabParamList } from '../../FrontendSelfTypes/NavigatorsInterfaces/MaterialOrdersRootTopTabParamLIst';
import { OwnerDesktopRootStackParamList } from '../../FrontendSelfTypes/NavigatorsInterfaces/OwnerDesktopRootStackParamList';

function OrderListItem<
  T extends keyof MaterialOrdersRootTopTabParamList,
  N extends keyof OrdersTopTabParamList,
  M extends keyof OwnerDesktopRootStackParamList,
>({ item: order, navigation }: OrderListItemI<T, N, M>) {
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

function MemoizedOrders<
  T extends keyof MaterialOrdersRootTopTabParamList,
  N extends keyof OrdersTopTabParamList,
  M extends keyof OwnerDesktopRootStackParamList,
>({
  navigation,
  sort,
  filterMethod,
  ListEmptyComponent,
}: OrdersListProps<T, N, M>) {
  const { data: orders } = useQuery<Array<OrderBaseI> | undefined>(
    'orders',
    getAllOrders,
  );
  const ordersData =
    (orders &&
      ((sort && filterMethod && orders.sort(sort).filter(filterMethod)) ||
        (sort && orders.sort(sort)) ||
        (filterMethod && orders.filter(filterMethod)))) ||
    orders;

  const RenderItem = ({ item }: OrderListRenderItem) =>
    OrderListItem({ item, navigation });
  return ordersData ? (
    <FlatList
      ListEmptyComponent={ListEmptyComponent}
      data={ordersData}
      keyExtractor={item => item.taskId}
      renderItem={RenderItem}
      className="flex-1 h-max"
      showsVerticalScrollIndicator={false}
    />
  ) : (
    <LoadingAnimation />
  );
}

const Orders = memo(
  MemoizedOrders,
  (prevProps, nextProps) =>
    prevProps.reloadIndicator === nextProps.reloadIndicator,
);

Orders.displayName = 'Orders';

// TODO this is not good way to solve this error but enough for now,
//  change in future https://stackoverflow.com/questions/60386614/how-to-use-props-with-generics-with-react-memo
export default Orders as typeof MemoizedOrders;
