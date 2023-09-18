import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, DataTable } from 'react-native-paper';
import { useQuery } from 'react-query';

import { useMemo } from 'react';
import {
  FieldI,
  FieldListProps,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { getAllFieldsByOrderId } from '../../helpers/api/Services/FieldsService';
import { FieldTableRow } from '../Organisms/FieldTableRow';
import { FieldTableHeaders } from '../Organisms/FieldTableHeaders';

export function FieldList({
  orderId,
  navigation,
  lPOff,
  shownFieldKeys,
  checkOn,
  setSelected,
}: FieldListProps) {
  const { data: orderConnectedFields } = useQuery<Array<FieldI> | undefined>(
    ['fields', orderId],
    ({ queryKey }) => getAllFieldsByOrderId(`${queryKey[1]}`),
  );
  console.log(orderConnectedFields === undefined);
  const fieldList = useMemo(() => {
    return (
      <FieldTableRow
        fields={orderConnectedFields}
        navigation={navigation}
        lPOff
        columnNames={shownFieldKeys}
        checkOn
        setSelected={setSelected}
      />
    );
  }, [orderConnectedFields]);
  return (
    <View className="grow">
      {orderId ? (
        <DataTable className="flex-1 w-full h-full">
          <ScrollView
            className="w-max h-max"
            showsVerticalScrollIndicator={false}
          >
            <FieldTableHeaders
              checkOn={checkOn}
              lPOff={lPOff}
              columnNames={shownFieldKeys}
            />
            {orderConnectedFields && fieldList}
          </ScrollView>
        </DataTable>
      ) : (
        <ActivityIndicator animating />
      )}
    </View>
  );
}
