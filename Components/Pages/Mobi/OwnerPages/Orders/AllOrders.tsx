import { SafeAreaView } from 'react-native';
import { useState } from 'react';
import { OrderStatus } from '../../../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { FiltersSetter } from '../../../../Molecules/FiltersSetter';

export function AllOrders() {
  const INIT_FILTER_NAME: string = OrderStatus[OrderStatus.Added];
  const filterValues = Object.keys(OrderStatus).filter(enumValue =>
    Number.isNaN(Number(enumValue)),
  );
  const [filter, setFilter] = useState<string>(INIT_FILTER_NAME);
  return (
    <SafeAreaView className="mr-4 ml-4">
      <FiltersSetter
        optionsRows={[filterValues]}
        onFilterOnOff={filterName => setFilter(filterName as string)}
        filterOn={filter}
      />
    </SafeAreaView>
  );
}
