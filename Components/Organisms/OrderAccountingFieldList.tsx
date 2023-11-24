import { FlatList } from 'react-native';
import React, { memo } from 'react';
import {
  AccountingFieldFlatListItem,
  OrderAccountingFieldListProps,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { OrderAccountingFieldListItem } from '../Molecules/OrderAccountingFieldListItem';

function RenderField({ item }: AccountingFieldFlatListItem) {
  return <OrderAccountingFieldListItem item={item} />;
}

const OrderAccountingFieldList = memo(
  ({ fields }: OrderAccountingFieldListProps) => {
    console.log('order accounting list render');
    return (
      <FlatList
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        data={fields}
        renderItem={RenderField}
      />
    );
  },
);

OrderAccountingFieldList.displayName = 'OrderAccountingFieldList';
export default OrderAccountingFieldList;
