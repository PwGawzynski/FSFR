import { View } from 'react-native';
import React from 'react';
import { ScreenTitleHeader } from './ScreenTitleHeader';

export function OrdersRootScreenTitle() {
  return (
    <View className="w-max ">
      <ScreenTitleHeader variant="lg">Orders</ScreenTitleHeader>
    </View>
  );
}
