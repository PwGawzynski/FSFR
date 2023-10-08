import { FlatList, View } from 'react-native';
import React, { memo } from 'react';
import { OrderAccountingFieldListProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { OrderAccountingFieldListItem } from '../Molecules/OrderAccountingFieldListItem';

// eslint-disable-next-line react/display-name
export const OrderAccountingFieldList = memo(
  ({ fields }: OrderAccountingFieldListProps) => {
    console.log('order accounting list render');
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={fields}
        renderItem={({ item }) => <OrderAccountingFieldListItem item={item} />}
      />
    );
  },
);
