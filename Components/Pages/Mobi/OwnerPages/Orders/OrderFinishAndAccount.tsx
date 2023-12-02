import { SafeAreaView, View } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import React, { useEffect, useMemo, useState } from 'react';
import { OwnerMobiOrdersTopTabProps } from '../../../../../FrontendSelfTypes/navigation/types';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';
import {
  OrderAccountingField,
  OrderAccountingFieldPrint,
  OrderAccountingPrintColumnsSettings,
} from '../../../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { LineDivider } from '../../../../Atoms/LineDivider';
import { TitleValueInfoComponent } from '../../../../Atoms/TitleValueInfoComponent';
import { AccountingSummaryAndPrint } from '../../../../Molecules/AccountingSummaryAndPrint';
import { PriceSetter } from '../../../../Molecules/PriceSetter';
import OrderAccountingFieldList from '../../../../Organisms/OrderAccountingFieldList';
import { orderFinishAndAccount } from '../../../../../helpers/api/Services/OrdersService';
import { ErrorInfoText } from '../../../../Atoms/ErrorInfoText';
import {
  OrderStatus,
  ServiceType,
} from '../../../../../FarmServiceTypes/Order/Enums';
import { OrderResponseBase } from '../../../../../FarmServiceTypes/Order/Ressponses';
import { TaskResponseBase } from '../../../../../FarmServiceTypes/Task/Restonses';
import { getAllOrdersTasks } from '../../../../../helpers/api/Services/Task';

const fieldDataColumnSettings: OrderAccountingPrintColumnsSettings = [
  {
    field: 'id',
    header: 'Field_id',
  },
  {
    field: 'polishSystemId',
    header: 'PLID',
  },
  {
    field: 'area',
    header: 'Area',
  },
  {
    field: 'price',
    header: 'Price',
  },
  {
    field: 'priceWTax',
    header: 'Price include Tax',
  },
];

export function OrderFinishAndAccount({
  route,
  navigation,
}: OwnerMobiOrdersTopTabProps<'ordersFinishAndAccount', 'orders'>) {
  const DEF_PRICE_PER_HA = '0.00';

  const orderId = route.params?.orderId;
  const { data: orderConnectedFields } = useQuery<
    Array<TaskResponseBase> | undefined
  >(
    ['orderAssignedTasks', orderId],
    ({ queryKey }) => {
      return getAllOrdersTasks(`${queryKey[1]}`);
    },
    { refetchOnWindowFocus: true },
  );
  const { data } = useQuery<Array<OrderResponseBase> | undefined>('orders');
  const order = data?.find(orderItem => orderItem.id === orderId);

  const [pricePerHa, setPricePerHa] = useState<string>(DEF_PRICE_PER_HA);
  const [reRenderListIndicator, setReRenderListIndicator] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const PRICE_PER_HA = Number(pricePerHa);
  const fieldsData = useMemo(
    () =>
      orderConnectedFields &&
      orderConnectedFields.map(
        task =>
          ({
            ...task,
            price: task.field.area * PRICE_PER_HA,
            priceWTax: task.field.area * PRICE_PER_HA * 1.23,
          } as OrderAccountingField),
      ),
    [orderConnectedFields, reRenderListIndicator],
  );

  const { isSuccess, mutate: accountOrder } = useMutation(
    orderFinishAndAccount,
  );

  useEffect(() => {
    if (isSuccess)
      navigation.navigate('OperationConfirmed', {
        redirectScreenName: 'ordersRoot',
        shownMessage: `It's done, your client will receive mail with invoice and accounting details within fev minutes`,
      });
  }, [isSuccess]);
  return (
    <SafeAreaView className="flex w-max h-full flex-col ml-4 mr-4">
      <ScreenTitleHeader variant="lg" abs="w-full">
        Order Accounting
      </ScreenTitleHeader>
      {order && (
        <TitleValueInfoComponent
          titles={['name', 'performance date', 'area', 'status', 'type']}
          keys={[
            order.name,
            new Date(order.performanceDate).toLocaleDateString(),
            order.totalArea,
            OrderStatus[order.status],
            ServiceType[order.serviceType],
          ]}
        />
      )}
      {fieldsData && (
        <View>
          {validationError && (
            <ErrorInfoText additionalStyles="text-center">
              Set price per ha
            </ErrorInfoText>
          )}
          <PriceSetter
            calculateOption
            price={pricePerHa}
            setPrice={setPricePerHa}
            setReRender={setReRenderListIndicator}
            onSavePress={() => {
              if (order && pricePerHa !== DEF_PRICE_PER_HA) accountOrder(order);
              if (pricePerHa === DEF_PRICE_PER_HA) setValidationError(true);
            }}
            onBlur={() =>
              pricePerHa !== DEF_PRICE_PER_HA && setValidationError(false)
            }
          />
        </View>
      )}
      {fieldsData && (
        <View className="flex-1 mt-4">
          <ScreenTitleHeader variant="sm" ats="text-[#279840]">
            Fields info
          </ScreenTitleHeader>
          <LineDivider abs="m-0" />
          <OrderAccountingFieldList tasks={fieldsData} />
          <LineDivider abs="m-0" />
        </View>
      )}

      <View className="flex-[0.5] max-h-[80] mb-2">
        {fieldsData && (
          <AccountingSummaryAndPrint
            fields={fieldsData.map(
              task =>
                ({
                  area: task.field.area,
                  priceWTax: task.priceWTax,
                  price: task.price,
                  id: task.id,
                  polishSystemId: task.field.polishSystemId,
                  address: task.field.address,
                  dateOfCollectionData: task.field.dateOfCollectionData,
                } as OrderAccountingFieldPrint),
            )}
            columnsSettings={fieldDataColumnSettings}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
