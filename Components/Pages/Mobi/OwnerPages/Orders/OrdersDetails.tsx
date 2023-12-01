import { SafeAreaView, View } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import { useEffect } from 'react';
import { OwnerMobiOrdersTopTabProps } from '../../../../../FrontendSelfTypes/navigation/types';

import { AppButton } from '../../../../Atoms/AppButton';
import { HeaderWithButton } from '../../../../Atoms/HeaderWithButton';
import { LineDivider } from '../../../../Atoms/LineDivider';
import { FieldList } from '../../../../Molecules/FieldList';
import { TitleValueInfoComponent } from '../../../../Atoms/TitleValueInfoComponent';
import { sendConfirmation } from '../../../../../helpers/api/Services/OrdersService';
import {
  OrderStatus,
  ServiceType,
} from '../../../../../FarmServiceTypes/Order/Enums';
import { OrderResponseBase } from '../../../../../FarmServiceTypes/Order/Ressponses';

export function OrdersDetails({
  route,
  navigation,
}: OwnerMobiOrdersTopTabProps<'orderDetails', 'orders'>) {
  const { data } = useQuery<Array<OrderResponseBase> | undefined>('orders');
  const orderId = route.params?.orderId;
  const order = data?.find(orderItem => orderItem.id === orderId);
  const { mutate: sendConfirmationAsk, isSuccess: askSend } =
    useMutation(sendConfirmation);

  useEffect(() => {
    if (askSend)
      navigation.navigate('OperationConfirmed', {
        shownMessage: `It's done, your client will recive, mail with confirmation request`,
        redirectScreenName: 'ordersRoot',
      });
  }, [askSend]);

  return (
    <SafeAreaView className="w-full h-full ">
      {orderId && order && (
        <SafeAreaView className="ml-4 mr-4 flex flex-col grow">
          <HeaderWithButton
            variant="lg"
            buttonAdditionalStyles=" flex-1"
            headerText={ServiceType[order.serviceType]}
            headerAdditionalStyles="flex-1"
            boxAdditionalStyles="mt-8"
            buttonText="Manage  workers"
            onButtonClick={() =>
              navigation.navigate('ordersManageWorkers', { orderId })
            }
          />
          <TitleValueInfoComponent
            titles={['Name', 'performance date', 'area', 'status']}
            keys={[
              order.name,
              new Date(order.performanceDate).toLocaleDateString(),
              order.totalArea,
              OrderStatus[order.status],
            ]}
          />
          <LineDivider />
          <HeaderWithButton
            onButtonClick={() =>
              navigation.navigate('ordersAddField', { orderId })
            }
            headerText="Fields"
            buttonText="Add"
            variant="sm"
            buttonAdditionalStyles="w-1/3 flex-none"
          />
          <FieldList
            orderId={orderId}
            navigation={navigation}
            shownFieldKeys={[
              { key: 'polishSystemId', alternativeName: 'PLID' },
              { key: 'area' },
            ]}
          />

          <View className="flex-col flex max-w-max">
            <LineDivider abs="mt-0 mb-0" />
            <View className="flex-row justify-between mt-4 mb-4">
              <AppButton
                action={() => sendConfirmationAsk(order.id)}
                context="request confirmation"
                ats="text-sm"
                abs="w-3/5 bg-[#434343]"
              />
              <AppButton
                action={() =>
                  navigation.navigate('OperationDanger', {
                    shownMessage: [
                      'Are you sure ?',
                      'This operation cannot be canceled',
                    ],
                    afterDangerScreenName: 'ordersRoot',
                    dangerButtonSign: 'delete',
                  })
                }
                context="Close"
                abs="w-1/4 bg-[#FF0000]"
              />
            </View>
            <AppButton
              action={() =>
                navigation.navigate('ordersFinishAndAccount', { orderId })
              }
              context="Finish and account"
              abs="bg-[#279840]"
            />
          </View>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}
