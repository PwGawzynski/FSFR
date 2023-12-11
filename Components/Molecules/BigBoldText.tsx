import { Text } from 'react-native';
import React from 'react';

export interface Props {
  additionalStyles?: string;

  children: React.ReactNode;
}
export function BigBoldText({ additionalStyles, children }: Props) {
  return (
    <Text
      adjustsFontSizeToFit
      numberOfLines={1}
      testID="big-bold-text"
      className={`w-full text-xl font-medium ${additionalStyles}`}
    >
      {children}
    </Text>
  );
}
