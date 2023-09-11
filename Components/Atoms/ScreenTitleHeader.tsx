import { View } from 'react-native';
import React from 'react';
import { BigBoldText } from '../Molecules/BigBoldText';
import { ScreenTitleHeaderProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function ScreenTitleHeader({
  variant,
  children,
  additionalStyles,
  additionalTextStyles,
}: ScreenTitleHeaderProps) {
  return (
    <View className={`justify-center ${additionalStyles}`}>
      <BigBoldText
        additionalStyles={`uppercase ${
          variant === 'lg' ? 'text-2xl' : ''
        } ${additionalTextStyles}`}
      >
        {children}
      </BigBoldText>
    </View>
  );
}
