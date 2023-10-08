import { Text, TouchableOpacity, View } from 'react-native';
import { OrderAccountingFieldListItemProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function OrderAccountingFieldListItem({
  item,
}: OrderAccountingFieldListItemProps) {
  return (
    <TouchableOpacity className="grow flex-col items-start justify-center">
      <View className="grow">
        <Text className="text-lg font-semibold">{item.name}</Text>
      </View>
      <View className="grow flex-row">
        <Text className="flex-1">Price</Text>
        <Text className="flex-1 text-right">{item.priceWTax.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}
