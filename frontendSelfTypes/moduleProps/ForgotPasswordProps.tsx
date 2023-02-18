import { StackScreenProps } from '@react-navigation/stack';
import { LoginStackParamList } from '../../App';

export type ForgotPasswordProps = Omit<
  StackScreenProps<LoginStackParamList>,
  'route'
>;
