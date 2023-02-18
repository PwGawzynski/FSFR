import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { LoginStackParamList } from '../../App';

type DefProps = Omit<StackScreenProps<LoginStackParamList>, 'route'>;
export interface LoginProps extends DefProps {
  onOff: boolean;
  setOnOff: React.Dispatch<React.SetStateAction<boolean>>;
}
