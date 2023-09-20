import { ScrollView, Text, View } from 'react-native';
import { useMemo } from 'react';
import { TableProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

const setCellStyles = (headersLen: number, index: number) =>
  `w-20 items-center ${!index && 'items-start'} ${
    index === headersLen - 1 && 'items-end'
  } justify-center`;

export function Table<T extends Record<string, any>>({
  headers,
  values,
}: TableProps<T>) {
  console.log('table reload');
  const tableHeaders = useMemo(
    () => (
      <View className="flex-row pt-4 pb-4">
        {headers.map((header, i) => (
          <View
            className={setCellStyles(headers.length, i)}
            key={Math.random()}
          >
            <Text className="uppercase font-bold">{header.toString()}</Text>
          </View>
        ))}
      </View>
    ),
    [],
  );
  const tableValues = useMemo(
    () =>
      values.map(v => (
        <View key={Math.random()} className="grow flex-row h-10">
          {headers.map((header, i) => (
            <View
              className={setCellStyles(headers.length, i)}
              key={Math.random()}
            >
              <Text>
                {typeof v[header] === 'string' && v[header].slice(-8)}
                {typeof v[header] === 'number' && v[header].toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      )),
    [values],
  );
  return (
    <View className="flex items-center grow">
      <ScrollView
        className="grow"
        contentContainerStyle={{
          flexDirection: 'column',
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {tableHeaders}
        <ScrollView
          className="grow"
          contentContainerStyle={{
            flexDirection: 'column',
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {tableValues}
        </ScrollView>
      </ScrollView>
    </View>
  );
}
