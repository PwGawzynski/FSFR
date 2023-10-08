import { View } from 'react-native';
import React from 'react';
import { NumericInput } from './NumericInput';
import { AppButton } from '../Atoms/AppButton';
import { PriceSetterProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function PriceSetter({
  price,
  setPrice,
  setReRender,
  onCalculatePress,
  onSavePress,
}: PriceSetterProps) {
  return (
    <View className="flex-col justify-center">
      <NumericInput
        additionalBoxStyles="flex-grow-0"
        onBlur={() => setReRender && setReRender(prevState => !prevState)}
        value={price}
        setter={setPrice}
        label="Price Per Ha"
      />
      <View className="grow w-full flex-row justify-between items-center">
        <AppButton
          additionalStyles="bg-[#808080] mt-2 w-1/3"
          action={() => {
            if (setReRender) setReRender(prevState => !prevState);
            if (onCalculatePress) onCalculatePress();
          }}
          context="calculate"
        />
        <AppButton
          additionalStyles="bg-[#279840] mt-2 w-1/2"
          action={() => {
            if (setReRender) setReRender(prevState => !prevState);
            if (onSavePress) onSavePress();
          }}
          context="save"
        />
      </View>
    </View>
  );
}
