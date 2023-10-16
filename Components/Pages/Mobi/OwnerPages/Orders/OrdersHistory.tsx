import { SafeAreaView } from 'react-native';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';
import { OrdersListSearchAndFilter } from '../../../../Organisms/OrdersListSearchAndFilter';
import { doneOrdersFilterMethod } from '../../../../../helpers/handlers/ordersFilterHandler';

export function OrdersHistory() {
  return (
    <SafeAreaView className="flex-col h-full justify-center mr-4 ml-4 ">
      <ScreenTitleHeader variant="lg">Closed Orders</ScreenTitleHeader>
      <OrdersListSearchAndFilter filterMethod={doneOrdersFilterMethod} />
    </SafeAreaView>
  );
}
