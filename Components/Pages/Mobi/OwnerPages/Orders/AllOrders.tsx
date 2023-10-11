import { SafeAreaView } from 'react-native';
import { useState } from 'react';
import { OrderStatus } from '../../../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { FiltersSetter } from '../../../../Molecules/FiltersSetter';
import { EmptyListInfo } from '../../../../Molecules/EmptyListInfo';
import { filterByStatus } from '../../../../../helpers/handlers/ordersFilterHandler';
import { OrdersList } from '../../../../Organisms/OrdersList';
import { OwnerMobiOrdersTopTabProps } from '../../../../../FrontendSelfTypes/navigation/types';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';

export function AllOrders({
  navigation,
  route,
}: OwnerMobiOrdersTopTabProps<'allOrders', 'orders'>) {
  const INIT_FILTER_NAME: string = OrderStatus[OrderStatus.Added];
  const filterValues = Object.keys(OrderStatus).filter(enumValue =>
    Number.isNaN(Number(enumValue)),
  );
  const [filter, setFilter] = useState<string>(INIT_FILTER_NAME);
  return (
    <SafeAreaView className="flex-col h-full justify-center mr-4 ml-4">
      <ScreenTitleHeader variant="lg" additionalStyles="mb-8 mt-4">
        All Orders
      </ScreenTitleHeader>
      <FiltersSetter
        optionsRows={[filterValues]}
        onFilterOnOff={filterName => setFilter(filterName as string)}
        filterOn={filter}
      />
      <OrdersList
        ListEmptyComponent={<EmptyListInfo text="Nothing to see here..." />}
        navigation={navigation}
        route={route}
        filterMethod={order => filterByStatus(order, filter)}
        reloadIndicator={filter}
      />
    </SafeAreaView>
  );
}
