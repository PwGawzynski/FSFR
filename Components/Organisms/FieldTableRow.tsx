import { Text, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';
import {
  FieldI,
  FieldStatus,
  FieldTableRowProps,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { CheckBox } from '../Atoms/CheckBox';

export const FieldTableRow = ({
  fields,
  navigation,
  lPOff,
  setSelected,
  columnNames,
  checkOn,
}: FieldTableRowProps) => {
  return fields?.map((f: FieldI, i) => (
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
        {!lPOff && (
          <DataTable.Cell
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}
            numeric
          >
            <Text className="text-black text-sm">{`${i + 1}`}</Text>
          </DataTable.Cell>
        )}
        {columnNames.map(({ key }, index) => (
          <DataTable.Cell
            key={Math.random()}
            style={{
              display: 'flex',
              flexGrow: 1.5,
              flexDirection: 'row',
              justifyContent: `${
                (index === columnNames.length - 1 && !checkOn && 'flex-end') ||
                (index === 0 && 'flex-start') ||
                'center'
              }`,
            }}
            numeric={typeof f[key] === 'number'}
          >
            <Text className="text-black text-sm">
              {key === 'status' && FieldStatus[f[key]]}
              {key === 'fieldId' && f[key].slice(-4)}
              {key !== 'status' && key !== 'fieldId' && f[key]}
            </Text>
          </DataTable.Cell>
        ))}
        {checkOn && (
          <DataTable.Cell
            style={{
              alignItems: 'center',
              justifyContent: 'flex-end',
              display: 'flex',
              flexGrow: 1,
            }}
          >
            <CheckBox
              onPress={() => {
                if (setSelected)
                  setSelected(prevState => [...prevState, f.fieldId]);
              }}
            />
          </DataTable.Cell>
        )}
      </DataTable.Row>
    </TouchableOpacity>
  ));
};
