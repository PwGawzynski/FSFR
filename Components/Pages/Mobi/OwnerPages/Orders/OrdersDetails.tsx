import { SafeAreaView, View } from 'react-native';
import { useQuery } from 'react-query';
import { OwnerMobiOrdersTopTabProps } from '../../../../../FrontendSelfTypes/navigation/types';
import {
  OrderBaseI,
  TaskType,
} from '../../../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { AppButton } from '../../../../Atoms/AppButton';
import { HeaderWithButton } from '../../../../Atoms/HeaderWithButton';
import { OrderDetailsInfo } from '../../../../Atoms/OrderDetailsInfo';
import { LineDivider } from '../../../../Atoms/LineDivider';
import { FieldList } from '../../../../Molecules/FieldList';

export function OrdersDetails({
  route,
  navigation,
}: OwnerMobiOrdersTopTabProps<'orderDetails', 'orders'>) {
  const { data } = useQuery<Array<OrderBaseI> | undefined>('orders');
  const orderId = route.params?.orderId;
  const order = data?.find(orderItem => orderItem.taskId === orderId);

  return (
    <SafeAreaView className="w-full h-full ">
      {orderId && order && (
        <SafeAreaView className="ml-4 mr-4 flex flex-col grow">
          <HeaderWithButton
            variant="lg"
            buttonAdditionalStyles="ml-4 flex-1"
            headerText={TaskType[order.type]}
            headerAdditionalStyles="mr-4 flex-1"
            boxAdditionalStyles="mt-8"
            buttonText="Manage assigned workers"
            onButtonClick={() => navigation.navigate('ordersAddWorker')}
          />
          <OrderDetailsInfo order={order} />
          <LineDivider />
          <HeaderWithButton
            onButtonClick={() => navigation.navigate('ordersAddField')}
            headerText="Fields"
            buttonText="Add"
            variant="sm"
            buttonAdditionalStyles="w-1/3"
          />
          <FieldList orderId={orderId} />

          <View className="flex-col flex max-w-max">
            <LineDivider additionalStyles="mt-0 mb-0" />
            <View className="flex-row justify-between mt-4 mb-4">
              <AppButton
                action={() => console.log('send confirmation request')}
                context="send confirmation request"
                additionalTextStyles="text-sm"
                additionalStyles="w-3/5 bg-[#434343]"
              />
              <AppButton
                action={() => console.log('Close')}
                context="Close"
                additionalStyles="w-1/4 bg-[#FF0000]"
              />
            </View>
            <AppButton
              action={() => console.log('Finish and account')}
              context="Finish and account"
              additionalStyles="bg-[#279840]"
            />
          </View>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}
