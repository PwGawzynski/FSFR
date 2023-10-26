import { SafeAreaView } from 'react-native';
import { useState } from 'react';
import {
  ActiveFilterValue,
  OrderBaseI,
  OrderStatus,
} from '../../../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { EmptyListInfo } from '../../../../Molecules/EmptyListInfo';
import { filterByStatus } from '../../../../../helpers/handlers/ordersFilterHandler';
import { OrdersList } from '../../../../Organisms/OrdersList';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';
import { mapEnumToSubOptionPairs } from '../../../../../helpers/handlers/mapEnumToSubOptionsPairsHandler';
import { SubOptionFilterSetter } from '../../../../Molecules/SubOptionFilterSetter';

export function AllOrders() {
  const INIT_FILTER_NAME: ActiveFilterValue<OrderBaseI> = {
    main: 'status',
    active: { main: 'status' },
  };
  const filterValues = mapEnumToSubOptionPairs(OrderStatus);
  const [filter, setFilter] =
    useState<ActiveFilterValue<OrderBaseI>>(INIT_FILTER_NAME);
  return (
    <SafeAreaView className="flex-col h-full justify-center mr-4 ml-4">
      <ScreenTitleHeader variant="lg" abs="mb-8 mt-4">
        All Orders
      </ScreenTitleHeader>
      <SubOptionFilterSetter<OrderBaseI>
        options={{ main: 'status', subOptions: filterValues }}
        onFilterOnOff={filterName => setFilter(filterName)}
        filterOn={filter}
      />
      <OrdersList
        abs="mt-6"
        ListEmptyComponent={<EmptyListInfo text="Nothing to see here..." />}
        filterMethod={order =>
          filter.active?.subOption === undefined
            ? true
            : filterByStatus(order, filter.active.subOption)
        }
        reloadIndicator={filter}
      />
    </SafeAreaView>
  );
}
