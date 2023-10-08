import { SafeAreaView, Text, View } from 'react-native';
import { useQuery } from 'react-query';
import React, { useMemo, useState } from 'react';
import { OwnerMobiOrdersTopTabProps } from '../../../../../FrontendSelfTypes/navigation/types';
import { ScreenTitleHeader } from '../../../../Atoms/ScreenTitleHeader';
import {
  FieldI,
  OrderAccountingField,
  OrderAccountingPrintColumnsSettings,
  OrderBaseI,
  OrderStats,
} from '../../../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { OrderAccountingFieldList } from '../../../../Organisms/OrderAccountingFieldList';
import { LineDivider } from '../../../../Atoms/LineDivider';
import { TitleValueInfoComponent } from '../../../../Atoms/TitleValueInfoComponent';
import { AccountingSummaryAndPrint } from '../../../../Molecules/AccountingSummaryAndPrint';
import { PriceSetter } from '../../../../Molecules/PriceSetter';

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
  const orderId = route.params?.orderId;
  const { data: orderConnectedFields } = useQuery<Array<FieldI> | undefined>([
    'fields',
    orderId,
  ]);
  const { data } = useQuery<Array<OrderBaseI> | undefined>('orders');
  const order = data?.find(orderItem => orderItem.taskId === orderId);

  const [pricePerHa, setPricePerHa] = useState<string>('0.00');
  const [reRenderListIndicator, setReRenderListIndicator] = useState(false);
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

  return (
    <SafeAreaView className="flex w-max h-full flex-col ml-4 mr-4">
      <ScreenTitleHeader variant="lg" additionalStyles="w-full">
        Order Accounting
      </ScreenTitleHeader>
      {order && (
        <TitleValueInfoComponent
          titles={[
            'purchaser',
            'performance date',
            'area',
            'status',
            'rest area',
          ]}
          keys={[
            order.client,
            order.performanceDate,
            order.area.toString(),
            OrderStats[order.status],
            (order.area - order.doneArea).toFixed(2),
          ]}
        />
      )}
      {fieldsData && (
        <PriceSetter
          price={pricePerHa}
          setPrice={setPricePerHa}
          setReRender={setReRenderListIndicator}
        />
      )}
      {fieldsData && (
        <View className="h-1/2 mt-4">
          <ScreenTitleHeader variant="sm" additionalTextStyles="text-[#279840]">
            Fields info
          </ScreenTitleHeader>
          <LineDivider additionalStyles="m-0" />
          <OrderAccountingFieldList fields={fieldsData} />
          <LineDivider additionalStyles="m-0" />
        </View>
      )}

      {fieldsData && (
        <AccountingSummaryAndPrint
          fields={fieldsData}
          columnsSettings={fieldDataColumnSettings}
        />
      )}
    </SafeAreaView>
  );
}
