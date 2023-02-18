import { StackScreenProps } from '@react-navigation/stack';
import { LoginStackParamList } from '../../App';

export type RegisterFormProps = Omit<
  StackScreenProps<LoginStackParamList, 'Register'>,
  'route'
>;
