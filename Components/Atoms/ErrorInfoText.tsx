import React from 'react';
import { Text } from 'react-native';

export interface Props {
  children: React.ReactNode;

  additionalStyles?: string;
}

export function ErrorInfoText({ children, additionalStyles }: Props) {
  return <Text className={`text-red-600 ${additionalStyles}`}>{children}</Text>;
}
