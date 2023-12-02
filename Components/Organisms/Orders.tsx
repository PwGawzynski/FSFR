import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { FlashList } from '@shopify/flash-list';
import { OrderShortInfoBox } from '../Molecules/OrderShortInfoBox';
import {
  OrderListItemI,
  OrdersListProps,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { getAllOrders } from '../../helpers/api/Services/OrdersService';
import { LoadingAnimation } from '../Atoms/LoadingAnimation';
import { OrderResponseBase } from '../../FarmServiceTypes/Order/Ressponses';

function MemoizedOrders({
  sort,
  filterMethod,
  ListEmptyComponent,
  reloadIndicator,
}: OrdersListProps) {
  const OrderListItem = useCallback(({ item: order }: OrderListItemI) => {
    return (
      <OrderShortInfoBox
        totalArea={order.totalArea}
        status={order.status}
        name={order.name}
        id={order.id}
        serviceType={order.serviceType}
        pricePerUnit={order.pricePerUnit}
        createdAt={order.createdAt}
        openedAt={order.openedAt}
        key={order.id}
        additionalInfo={order.additionalInfo}
        performanceDate={order.performanceDate}
      />
    );
  }, []);

  const { data: orders } = useQuery<Array<OrderResponseBase> | undefined>(
    'orders',
    getAllOrders,
    { refetchOnWindowFocus: true },
  );
  const [ordersData, setOrdersData] = useState<
    Array<OrderResponseBase> | undefined
  >();
  useEffect(() => {
    const filteredOrders =
      (orders &&
        ((sort && filterMethod && orders.sort(sort).filter(filterMethod)) ||
          (sort && orders.sort(sort)) ||
          (filterMethod && orders.filter(filterMethod)))) ||
      orders;
    if (filteredOrders) setOrdersData(filteredOrders && [...filteredOrders]);
  }, [orders, reloadIndicator]);
  const list = useMemo(
    () => (
      <FlashList
        onLoad={info => console.log('OrdersList has been loaded in ', info)}
        estimatedItemSize={130}
        ListEmptyComponent={ListEmptyComponent}
        data={ordersData}
        keyExtractor={item => item.id}
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
