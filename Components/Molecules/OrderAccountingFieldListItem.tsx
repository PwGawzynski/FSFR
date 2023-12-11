import { Text, TouchableOpacity, View } from 'react-native';
import { OrderAccountingFieldListItemProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { TaskType } from '../../FarmServiceTypes/Task/Enums';

export function OrderAccountingFieldListItem({
  item,
}: OrderAccountingFieldListItemProps) {
  return (
    <TouchableOpacity
      testID="order-accounting-field-list-item"
      className="grow flex-col items-start justify-center"
    >
      <View testID="polish-system-id" className="grow">
        <Text className="text-lg font-semibold">
          {item.field.polishSystemId}
        </Text>
      </View>
      <View className="grow flex-row">
        <View className="flex-1 flex-row">
          <Text testID="task-type" className="flex-1 text-left">
            {TaskType[item.type]}
          </Text>
        </View>
        <View className="flex-1 flex-row">
          <Text testID="price-wtax" className="flex-1 text-right">
            {item.priceWTax.toFixed(2)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
