import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import React from 'react';
import {
  AddOrderFormProps,
  NewOrderI,
  TaskType,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { AppInput } from './AppInput';

export function AddOrderForm({ setNewOrder, newOrder }: AddOrderFormProps) {
  return (
    <>
      <AppInput
        setter={setNewOrder}
        ObjectKey="name"
        value={newOrder.name}
        underlyingLabel="Task Name"
        additionalStyles="flex-1 justify-end"
        additionalTextStyles="h-max"
      />
      <AppInput
        setter={setNewOrder}
        ObjectKey="additionalInfo"
        value={newOrder.additionalInfo}
        underlyingLabel="Additional Info"
        additionalStyles="grow justify-end "
      />
      <AppInput
        setter={setNewOrder}
        ObjectKey="performanceDate"
        value={newOrder.performanceDate}
        underlyingLabel="Performance Date"
        additionalStyles="flex-1 justify-end "
      />
      <AppInput
        setter={setNewOrder}
        ObjectKey="client"
        value={newOrder.client}
        underlyingLabel="Client"
        additionalStyles="flex-1 justify-end "
      />
      <View className="flex-1 max-h-12 pb-4 border-solid border-b-4 mt-4 mb-8 order-2 justify-end">
        <RNPickerSelect
          onValueChange={(v, i) =>
            setNewOrder((prevState: NewOrderI) => ({
              ...prevState,
              type: i,
            }))
          }
          items={(
            Object.values(TaskType).filter(e =>
              Number.isNaN(Number(e)),
            ) as Array<string>
          ).map((name: string) => ({
            label: name,
            value: name,
          }))}
        />
      </View>
    </>
  );
}
