import { FlatList } from 'react-native';
import React, { memo } from 'react';
import { OrderAccountingFieldListProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { OrderAccountingFieldListItem } from '../Molecules/OrderAccountingFieldListItem';

const OrderAccountingFieldList = memo(
  ({ fields }: OrderAccountingFieldListProps) => {
    console.log('order accounting list render');
    return (
      <FlatList
        keyExtractor={item => item.fieldId}
        showsVerticalScrollIndicator={false}
        data={fields}
        renderItem={({ item }) => <OrderAccountingFieldListItem item={item} />}
      />
    );
  },
);

OrderAccountingFieldList.displayName = 'OrderAccountingFieldList';
export default OrderAccountingFieldList;
