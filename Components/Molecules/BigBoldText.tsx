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
      className={`w-full text-xl font-medium ${additionalStyles}`}
    >
      {children}
    </Text>
  );
}
