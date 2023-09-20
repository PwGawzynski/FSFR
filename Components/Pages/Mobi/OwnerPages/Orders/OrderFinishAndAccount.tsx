import { SafeAreaView, View } from 'react-native';
import { useQuery } from 'react-query';
import { OwnerMobiOrdersTopTabProps } from '../../../../../FrontendSelfTypes/navigation/types';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';
import { FieldI } from '../../../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { getAllFieldsByOrderId } from '../../../../../helpers/api/Services/FieldsService';
import { Table } from '../../../../Organisms/Table';

export function OrderFinishAndAccount({
  route,
  navigation,
}: OwnerMobiOrdersTopTabProps<'ordersFinishAndAccount', 'orders'>) {
  const orderId = route.params?.orderId;
  const { data: orderConnectedFields } = useQuery<Array<FieldI> | undefined>(
    ['fields', orderId],
    ({ queryKey }) => getAllFieldsByOrderId(`${queryKey[1]}`),
  );
  return (
    <SafeAreaView className="w-full h-full">
      <View className="ml-4 mr-4 flex items-center grow">
        <ScreenTitleHeader variant="lg" additionalStyles="w-full">
          Order Accounting
        </ScreenTitleHeader>
        {orderConnectedFields && (
          <Table
            headers={[
              'status',
              'fieldId',
              'status',
              'status',
              'status',
              'status',
              'status',
              'status',
              'status',
              'status',
              'status',
              'status',
              'fieldId',
            ]}
            values={[...orderConnectedFields, ...orderConnectedFields]}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
