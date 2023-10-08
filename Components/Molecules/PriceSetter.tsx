import { View } from 'react-native';
import React from 'react';
import { NumericInput } from './NumericInput';
import { AppButton } from '../Atoms/AppButton';
import { PriceSetterProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function PriceSetter({
  price,
  setPrice,
  setReRender,
}: PriceSetterProps) {
  return (
    <View className=" flex-col justify-center">
      <NumericInput
        additionalBoxStyles="flex-grow-0"
        onBlur={() => setReRender && setReRender(prevState => !prevState)}
        value={price}
        setter={setPrice}
        label="Price Per Ha"
      />
      <AppButton
        additionalStyles="bg-[#279840] mt-6"
        action={() => setReRender && setReRender(prevState => !prevState)}
        context="save"
      />
    </View>
  );
}
