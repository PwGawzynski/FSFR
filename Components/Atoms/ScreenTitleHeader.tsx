import { View } from 'react-native';
import React from 'react';
import { BigBoldText } from '../Molecules/BigBoldText';
import { ScreenTitleHeaderProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function ScreenTitleHeader({
  variant,
  children,
  abs,
  ats,
}: ScreenTitleHeaderProps) {
  return (
    <View testID="screen-title-header" className={`justify-center ${abs}`}>
      <BigBoldText
        additionalStyles={`uppercase ${
          variant === 'lg' ? 'text-2xl' : ''
        } ${ats}`}
      >
        {children}
      </BigBoldText>
    </View>
  );
}
