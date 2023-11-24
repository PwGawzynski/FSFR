import { Text, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';
import { FieldTableRowProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { CheckBox } from '../Atoms/CheckBox';
import { FieldResponseBase } from '../../FarmServiceTypes/Field/Ressponses';

export const FieldTableRow = ({
  fields,
  navigation,
  lPOff,
  setSelected,
  columnNames,
  checkOn,
}: FieldTableRowProps) => {
  return fields?.map((f: FieldResponseBase, i) => (
    <TouchableOpacity
      key={f.id}
      onPress={() =>
        navigation.navigate('fields', {
          screen: 'fieldDetails',
          params: {
            fieldId: f.id,
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
              {key === 'id' && f[key].slice(-4)}
              {key === 'polishSystemId' && f[key].slice(-8)}
              {key !== 'id' && key !== 'polishSystemId' && f[key].toString()}
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
                if (setSelected) setSelected(prevState => [...prevState, f.id]);
              }}
            />
          </DataTable.Cell>
        )}
      </DataTable.Row>
    </TouchableOpacity>
  ));
};
