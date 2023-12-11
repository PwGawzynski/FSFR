import { TouchableOpacity } from 'react-native';
import React from 'react';
import Magnifier from '../../assets/magnifier.svg';
import { MagnifierButtonProps } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export function MagnifierButton({ onPress }: MagnifierButtonProps) {
  return (
    <TouchableOpacity
      testID="magnifier-button"
      onPress={onPress}
      className="h-9 w-9 rounded-full ml-4 bg-black p-2"
    >
      <Magnifier fill="#fff" />
    </TouchableOpacity>
  );
}
