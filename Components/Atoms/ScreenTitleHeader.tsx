import { View } from 'react-native';
import React from 'react';
import { BigBoldText } from '../Molecules/BigBoldText';
import { ScreenTitleHeaderProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function ScreenTitleHeader({
  variant,
  children,
}: ScreenTitleHeaderProps) {
  return (
    <View className="ml-4 flex-1 justify-center">
      <BigBoldText
        additionalStyles={`uppercase ${variant === 'lg' ? 'text-2xl' : ''}`}
      >
        {children}
      </BigBoldText>
    </View>
  );
}
