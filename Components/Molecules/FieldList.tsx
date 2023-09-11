import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useQuery } from 'react-query';
import {
  FieldI,
  FieldListProps,
  FieldStatus,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { getAllFieldsByOrderId } from '../../helpers/api/Services/FieldsService';

export function FieldList({ orderId, navigation }: FieldListProps) {
  const { data: orderConnectedFields } = useQuery<Array<FieldI> | undefined>(
    ['fields', orderId],
    ({ queryKey }) => getAllFieldsByOrderId(`${queryKey[1]}`),
  );
  return (
    <View className="grow">
      <DataTable className="flex-1 w-full h-full">
        <DataTable.Header>
          <DataTable.Title>
            <Text className="text-black text-sm uppercase font-bold">LP</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text className="text-black text-sm uppercase font-bold">Area</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text className="text-black text-sm uppercase font-bold">
              FieldId
            </Text>
          </DataTable.Title>
          <DataTable.Title
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <Text className="text-black text-sm uppercase font-bold">
              Status
            </Text>
          </DataTable.Title>
        </DataTable.Header>
        <ScrollView
          className="w-max h-max"
          showsVerticalScrollIndicator={false}
        >
          {orderConnectedFields &&
            orderConnectedFields.map((f: FieldI, i) => (
              <TouchableOpacity
                key={f.fieldId}
                onPress={() =>
                  navigation.navigate('fields', {
                    screen: 'fieldDetails',
                    params: {
                      fieldId: f.fieldId,
                    },
                  })
                }
              >
                <DataTable.Row>
                  <DataTable.Cell
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                    }}
                    numeric
                  >
                    <Text className="text-black text-sm">{`${i}`}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                    }}
                    numeric
                  >
                    <Text className="text-black text-sm">{f.area}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Text className="text-black text-sm">{f.fieldId}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Text className="text-black text-sm">
                      {FieldStatus[f.status]}
                    </Text>
                  </DataTable.Cell>
                </DataTable.Row>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </DataTable>
    </View>
  );
}
