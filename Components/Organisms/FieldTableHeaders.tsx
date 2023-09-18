import { DataTable } from 'react-native-paper';
import { Text } from 'react-native';
import { FieldTableHeadersProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function FieldTableHeaders({
  lPOff,
  checkOn,
  columnNames,
}: FieldTableHeadersProps) {
  return (
    <DataTable.Header>
      {!lPOff && (
        <DataTable.Title>
          <Text className="text-black text-sm uppercase font-bold">LP</Text>
        </DataTable.Title>
      )}
      {columnNames.map(({ key, alternativeName }, index) => (
        <DataTable.Title
          key={Math.random()}
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1.5,
            justifyContent: `${
              (index === columnNames.length - 1 && !checkOn && 'flex-end') ||
              (index === 0 && 'flex-start') ||
              'center'
            }`,
          }}
        >
          <Text className="text-black uppercase font-bold">
            {alternativeName || key}
          </Text>
        </DataTable.Title>
      ))}
      {checkOn && (
        <DataTable.Title
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}
        >
          <Text className="text-black uppercase font-bold">Select</Text>
        </DataTable.Title>
      )}
    </DataTable.Header>
  );
}
