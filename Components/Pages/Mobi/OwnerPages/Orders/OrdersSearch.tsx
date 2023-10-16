import { SafeAreaView } from 'react-native';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';
import { OwnerOrdersMaterialRootProps } from '../../../../../FrontendSelfTypes/navigation/types';
import { OrdersListSearchAndFilter } from '../../../../Organisms/OrdersListSearchAndFilter';
import { OnlyOpenOrdersFilter } from '../../../../../helpers/handlers/ordersFilterHandler';

export function OrdersSearch({
  route,
  navigation,
}: OwnerOrdersMaterialRootProps<'ordersSearch', 'ordersRoot', 'orders'>) {
  return (
    <SafeAreaView className="flex-col h-full justify-center mr-4 ml-4 ">
      <ScreenTitleHeader variant="lg" abs="w-full justify-start mb-4">
        Search Order
      </ScreenTitleHeader>
      <OrdersListSearchAndFilter
        navigation={navigation}
        route={route}
        filterMethod={OnlyOpenOrdersFilter}
      />
    </SafeAreaView>
  );
}
