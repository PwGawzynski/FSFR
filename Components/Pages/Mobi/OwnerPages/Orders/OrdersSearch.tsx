import { SafeAreaView } from 'react-native';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';
import { OwnerMobiOrdersTopTabProps } from '../../../../../FrontendSelfTypes/navigation/types';
import { OrdersListSearchAndFilter } from '../../../../Organisms/OrdersListSearchAndFilter';

export function OrdersSearch({
  route,
  navigation,
}: OwnerMobiOrdersTopTabProps<'ordersSearch', 'orders'>) {
  return (
    <SafeAreaView className="flex-col h-full justify-center mr-4 ml-4 ">
      <ScreenTitleHeader
        variant="lg"
        additionalStyles="w-full justify-start mb-4"
      >
        Search Order
      </ScreenTitleHeader>
      <OrdersListSearchAndFilter navigation={navigation} route={route} />
    </SafeAreaView>
  );
}
