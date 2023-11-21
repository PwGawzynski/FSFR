import { View } from 'react-native';
import { useState } from 'react';
import { SearchModuleInterfaceBased } from './SearchModuleInterfaceBased';
import {
  ActiveFilterValue,
  OrderBaseI,
  OrdersListSearchAndFilterProps,
  OrderStatus,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { OrdersList } from './OrdersList';
import { EmptyListInfo } from '../Molecules/EmptyListInfo';
import { OrdersStackParamList } from '../../FrontendSelfTypes/NavigatorsInterfaces/OrdersStackParamList';
import { OwnerDesktopRootStackParamList } from '../../FrontendSelfTypes/NavigatorsInterfaces/OwnerDesktopRootStackParamList';
import { defaultOrdersFilterMethod } from '../../helpers/handlers/ordersFilterHandler';
import { MaterialOrdersRootTopTabParamList } from '../../FrontendSelfTypes/NavigatorsInterfaces/MaterialOrdersRootTopTabParamLIst';
import { mapEnumToSubOptionPairs } from '../../helpers/handlers/mapEnumToSubOptionsPairsHandler';

export function OrdersListSearchAndFilter<
  T extends keyof MaterialOrdersRootTopTabParamList,
  N extends keyof OrdersStackParamList,
  M extends keyof OwnerDesktopRootStackParamList,
>({ filterMethod }: OrdersListSearchAndFilterProps<T, N, M>) {
  const INIT_SEARCH_VALUE = '';
  const INIT_FILTER_NAME: ActiveFilterValue<OrderBaseI> = {
    main: 'name',
    active: { main: 'name' },
  };
  const [searchValue, setSearchValue] = useState(INIT_SEARCH_VALUE);
  const [filter, setFilter] =
    useState<ActiveFilterValue<OrderBaseI>>(INIT_FILTER_NAME);
  return (
    <>
      <SearchModuleInterfaceBased<OrderBaseI>
        optionsRows={[
          [{ main: 'client' }, { main: 'name' }],
          [
            {
              main: 'status',
              subOptions: mapEnumToSubOptionPairs(OrderStatus),
            },
            { main: 'totalArea' },
            { main: 'performanceDate' },
          ],
        ]}
        onFilterOnOff={filterName => setFilter(filterName)}
        filterOn={filter}
        onSearchPress={text => setSearchValue(text)}
      />
      <View className="flex-1 mt-8">
        <OrdersList
          ListEmptyComponent={<EmptyListInfo text="Nothing to see here..." />}
          filterMethod={order =>
            filterMethod
              ? filterMethod(order, filter, searchValue, INIT_SEARCH_VALUE)
              : defaultOrdersFilterMethod(
                  order,
                  filter,
                  searchValue,
                  INIT_SEARCH_VALUE,
                )
          }
          reloadIndicator={
            filter.active?.subOption !== undefined
              ? filter.active.subOption
              : searchValue
          }
        />
      </View>
    </>
  );
}
