import { StackScreenProps } from '@react-navigation/stack';
import { RegisterStackParamList } from './RegisterStack';

export type RootStackParamList = {
  Login: undefined;
  Register: StackScreenProps<RegisterStackParamList> | undefined;
  AuthCode: undefined;
  ResetPassword: undefined;
};
