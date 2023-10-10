import { SafeAreaView, View } from 'react-native';
import { useState } from 'react';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';
import { SearchEngine } from '../../../../Organisms/SearchEngine';
import { OwnerMobiOrdersTopTabProps } from '../../../../../FrontendSelfTypes/navigation/types';
import { OrdersList } from '../../../../Organisms/OrdersList';
import { EmptyListInfo } from '../../../../Molecules/EmptyListInfo';
import EmptyIco from '../../../../../assets/empty.svg';
import { FiltersSetter } from '../../../../Molecules/FiltersSetter';
import { OrderBaseI } from '../../../../../FrontendSelfTypes/moduleProps/ComponentsProps';

const filterOrderByKey = (
  order: OrderBaseI,
  filter: keyof OrderBaseI,
  searchValue: string,
) => {
  if (order[filter] && typeof order[filter] === 'string')
    return (order[filter] as string)
      ?.toLowerCase()
      .includes(searchValue.toLowerCase());
  if (order[filter] && typeof order[filter] === 'number')
    return order[filter]?.toString() === searchValue;
  return false;
};

export function OrdersSearch({
  route,
  navigation,
}: OwnerMobiOrdersTopTabProps<'ordersSearch', 'orders'>) {
  const INIT_SEARCH_VALUE = '';
  const INIT_FILTER_NAME: keyof OrderBaseI = 'name';
  const [searchValue, setSearchValue] = useState(INIT_SEARCH_VALUE);
  const [filter, setFilter] = useState<keyof OrderBaseI>(INIT_FILTER_NAME);
  return (
    <SafeAreaView className="flex-col h-full justify-center mr-4 ml-4 ">
      <ScreenTitleHeader
        variant="lg"
        additionalStyles="w-full justify-start mb-4"
      >
        Search Order
      </ScreenTitleHeader>
      <FiltersSetter<OrderBaseI>
        onFilterOnOff={filterName => setFilter(filterName)}
        filterOn={filter}
        optionsRows={[
          ['client', 'name'],
          ['status', 'area', 'performanceDate'],
        ]}
      />
      <SearchEngine onSearchPress={text => setSearchValue(text)} />
      <View className="flex-1 mt-8">
        <OrdersList
          ListEmptyComponent={
            <EmptyListInfo text="Nothing to see here...">
              <EmptyIco width={100} style={{ width: 100, height: 100 }} />
            </EmptyListInfo>
          }
          navigation={navigation}
          route={route}
          filterMethod={order =>
            searchValue === INIT_SEARCH_VALUE
              ? true
              : filterOrderByKey(order, filter, searchValue)
          }
          reloadIndicator={searchValue}
        />
      </View>
    </SafeAreaView>
  );
}
