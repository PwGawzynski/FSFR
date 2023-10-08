import { Text, View } from 'react-native';
import { OrderDetailsInfoProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function TitleValueInfoComponent({
  titles,
  keys,
}: OrderDetailsInfoProps) {
  return (
    <View className="flex flex-col">
      {titles.map((t, index) => (
        <View className="flex flex-row mt-2" key={Math.random()}>
          <Text className="flex-1 uppercase text-lg font-bold text-left">
            {t}
          </Text>
          <Text className="flex-1 uppercase text-lg  text-right">
            {keys[index]}
          </Text>
        </View>
      ))}
    </View>
  );
}
