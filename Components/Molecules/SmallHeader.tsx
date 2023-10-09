import { Text, View } from 'react-native';
import React from 'react';
import { SmallHeaderProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function SmallHeader({
  children: content,
  additionalBoxStyles,
  additionalTextStyles,
}: SmallHeaderProps) {
  return (
    <View className={`h-6 ${additionalBoxStyles}`}>
      <Text
        className={`w-max text-medium uppercase font-bold ${additionalTextStyles}`}
      >
        {content}
      </Text>
    </View>
  );
}
