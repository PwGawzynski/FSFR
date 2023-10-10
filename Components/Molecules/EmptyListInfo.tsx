import { Text, View } from 'react-native';
import { EmptyListProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function EmptyListInfo({ text, children: emoji }: EmptyListProps) {
  return (
    <View className="flex-1 flex-col items-center justify-start">
      <View className="items-center justify-center">{emoji}</View>
      <Text className="text-xl text-[#848484]">{text}</Text>
    </View>
  );
}
