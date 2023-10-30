import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { FlashList } from '@shopify/flash-list';
import { OrderShortInfoBox } from '../Molecules/OrderShortInfoBox';
import {
  OrderBaseI,
  OrderListItemI,
  OrdersListProps,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { getAllOrders } from '../../helpers/api/Services/OrdersService';
import { LoadingAnimation } from '../Atoms/LoadingAnimation';

function MemoizedOrders({
  sort,
  filterMethod,
  ListEmptyComponent,
  reloadIndicator,
}: OrdersListProps) {
  const OrderListItem = useCallback(({ item: order }: OrderListItemI) => {
    return (
      <OrderShortInfoBox
        area={order.area}
        status={order.status}
        doneArea={order.doneArea}
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
  }, []);

  const { data: orders } = useQuery<Array<OrderBaseI> | undefined>(
    'orders',
    getAllOrders,
  );
  const [ordersData, setOrdersData] = useState<Array<OrderBaseI> | undefined>();
  useEffect(() => {
    const filteredOrders =
      (orders &&
        ((sort && filterMethod && orders.sort(sort).filter(filterMethod)) ||
          (sort && orders.sort(sort)) ||
          (filterMethod && orders.filter(filterMethod)))) ||
      orders;
    if (orders) setOrdersData(filteredOrders && [...filteredOrders]);
  }, [orders, reloadIndicator]);

  const list = useMemo(
    () =>
      ordersData?.length && (
        <FlashList
          onLoad={info => console.log('OrdersList has been loaded in ', info)}
          estimatedItemSize={130}
          ListEmptyComponent={ListEmptyComponent}
          data={ordersData}
          keyExtractor={item => item.taskId}
          renderItem={OrderListItem}
          className="flex-1 h-max"
          showsVerticalScrollIndicator={false}
        />
      ),
    [ordersData],
  );

  return (ordersData && list) || <LoadingAnimation />;
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
