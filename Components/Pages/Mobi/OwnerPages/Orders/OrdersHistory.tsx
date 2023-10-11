import { SafeAreaView } from 'react-native';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';
import { OwnerMobiOrdersTopTabProps } from '../../../../../FrontendSelfTypes/navigation/types';
import { OrdersListSearchAndFilter } from '../../../../Organisms/OrdersListSearchAndFilter';
import { doneOrdersFilterMethod } from '../../../../../helpers/handlers/ordersFilterHandler';

export function OrdersHistory({
  route,
  navigation,
}: OwnerMobiOrdersTopTabProps<'ordersHistory', 'orders'>) {
  return (
    <SafeAreaView className="flex-col h-full justify-center mr-4 ml-4 ">
      <ScreenTitleHeader variant="lg">Closed Orders</ScreenTitleHeader>
      <OrdersListSearchAndFilter
        navigation={navigation}
        route={route}
        filterMethod={doneOrdersFilterMethod}
      />
    </SafeAreaView>
  );
}
