import React from 'react';
import { CustomInputProps } from './CustomInputProps';

export interface AppInputProps<T extends object>
  extends Omit<CustomInputProps, 'onChange'> {
  setter: React.Dispatch<React.SetStateAction<T>>;
  underlyingLabel: string;
  ObjectKey: keyof T;

  additionalStyles?: string;
}
