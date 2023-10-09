import { SafeAreaView, Text, View } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import React, { useEffect, useMemo, useState } from 'react';
import { OwnerMobiOrdersTopTabProps } from '../../../../../FrontendSelfTypes/navigation/types';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';
import {
  FieldI,
  OrderAccountingField,
  OrderAccountingPrintColumnsSettings,
  OrderBaseI,
  OrderStats,
  TaskType,
} from '../../../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { LineDivider } from '../../../../Atoms/LineDivider';
import { TitleValueInfoComponent } from '../../../../Atoms/TitleValueInfoComponent';
import { AccountingSummaryAndPrint } from '../../../../Molecules/AccountingSummaryAndPrint';
import { PriceSetter } from '../../../../Molecules/PriceSetter';
import OrderAccountingFieldList from '../../../../Organisms/OrderAccountingFieldList';
import { orderFinishAndAccount } from '../../../../../helpers/api/Services/OrdersService';
import { ErrorInfoText } from '../../../../Atoms/ErrorInfoText';

const fieldDataColumnSettings: OrderAccountingPrintColumnsSettings = [
  {
    field: 'fieldId',
    header: 'Field_id',
  },
  {
    field: 'name',
    header: 'Name',
  },
  {
    field: 'area',
    header: 'Area',
  },
  {
    field: 'city',
    header: 'City',
  },
  {
    field: 'county',
    header: 'County',
  },
  {
    field: 'dataCollectionDate',
    header: 'DOCD',
  },
  {
    field: 'voice',
    header: 'voice',
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
  const { data: orderConnectedFields } = useQuery<Array<FieldI> | undefined>([
    'fields',
    orderId,
  ]);
  const { data } = useQuery<Array<OrderBaseI> | undefined>('orders');
  const order = data?.find(orderItem => orderItem.taskId === orderId);

  const [pricePerHa, setPricePerHa] = useState<string>(DEF_PRICE_PER_HA);
  const [reRenderListIndicator, setReRenderListIndicator] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const PRICE_PER_HA = Number(pricePerHa);
  const fieldsData = useMemo(
    () =>
      orderConnectedFields &&
      orderConnectedFields.map(
        field =>
          ({
            ...field,
            price: field.area * PRICE_PER_HA,
            priceWTax: field.area * PRICE_PER_HA * 1.23,
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
      <ScreenTitleHeader variant="lg" additionalStyles="w-full">
        Order Accounting
      </ScreenTitleHeader>
      {order && (
        <TitleValueInfoComponent
          titles={['purchaser', 'performance date', 'area', 'status', 'type']}
          keys={[
            order.client,
            order.performanceDate,
            order.area.toString(),
            OrderStats[order.status],
            TaskType[order.type],
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
          <ScreenTitleHeader variant="sm" additionalTextStyles="text-[#279840]">
            Fields info
          </ScreenTitleHeader>
          <LineDivider additionalStyles="m-0" />
          <OrderAccountingFieldList fields={fieldsData} />
          <LineDivider additionalStyles="m-0" />
        </View>
      )}

      <View className="flex-[0.5] max-h-[80] mb-2">
        {fieldsData && (
          <AccountingSummaryAndPrint
            fields={fieldsData}
            columnsSettings={fieldDataColumnSettings}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
