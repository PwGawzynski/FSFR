import { Text, View } from 'react-native';
import { OrderDetailsInfoProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function TitleValueInfoComponent({
  titles,
  keys,
  abs,
  elementAbs,
}: OrderDetailsInfoProps) {
  return (
    <View testID="title-value-info" className={`flex flex-col ${abs}`}>
      {titles.map((t, index) => (
        <View
          testID="title-value-pair"
          className={`flex flex-row mt-2 ${elementAbs}`}
          key={Math.random()}
        >
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            className="flex-1 uppercase text-lg font-bold text-left"
          >
            {t}
          </Text>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            className="flex-1 uppercase text-lg  text-right"
          >
            {keys[index]}
          </Text>
        </View>
      ))}
    </View>
  );
}
