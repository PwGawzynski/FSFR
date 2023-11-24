import { View } from 'react-native';
import { useState } from 'react';
import { SearchModuleInterfaceBased } from './SearchModuleInterfaceBased';
import {
  ActiveFilterValue,
  OrdersListSearchAndFilterProps,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { OrdersList } from './OrdersList';
import { EmptyListInfo } from '../Molecules/EmptyListInfo';
import { OrdersStackParamList } from '../../FrontendSelfTypes/NavigatorsInterfaces/OrdersStackParamList';
import { OwnerDesktopRootStackParamList } from '../../FrontendSelfTypes/NavigatorsInterfaces/OwnerDesktopRootStackParamList';
import { defaultOrdersFilterMethod } from '../../helpers/handlers/ordersFilterHandler';
import { MaterialOrdersRootTopTabParamList } from '../../FrontendSelfTypes/NavigatorsInterfaces/MaterialOrdersRootTopTabParamLIst';
import { mapEnumToSubOptionPairs } from '../../helpers/handlers/mapEnumToSubOptionsPairsHandler';
import { OrderStatus } from '../../FarmServiceTypes/Order/Enums';
import { OrderResponseBase } from '../../FarmServiceTypes/Order/Ressponses';

export function OrdersListSearchAndFilter<
  T extends keyof MaterialOrdersRootTopTabParamList,
  N extends keyof OrdersStackParamList,
  M extends keyof OwnerDesktopRootStackParamList,
>({ filterMethod }: OrdersListSearchAndFilterProps<T, N, M>) {
  const INIT_SEARCH_VALUE = '';
  const INIT_FILTER_NAME: ActiveFilterValue<OrderResponseBase> = {
    main: 'name',
    active: { main: 'name' },
  };
  const [searchValue, setSearchValue] = useState(INIT_SEARCH_VALUE);
  const [filter, setFilter] =
    useState<ActiveFilterValue<OrderResponseBase>>(INIT_FILTER_NAME);
  return (
    <>
      <SearchModuleInterfaceBased<OrderResponseBase>
        optionsRows={[
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
