import { Text, View } from 'react-native';
import React from 'react';
import { SmallHeaderProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function SmallHeader({ children: content, abs, ats }: SmallHeaderProps) {
  return (
    <View className={`h-6 ${abs}`}>
      <Text className={`w-max text-medium uppercase font-bold ${ats}`}>
        {content}
      </Text>
    </View>
  );
}
