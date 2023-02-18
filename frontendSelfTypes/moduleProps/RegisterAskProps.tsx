import { StackScreenProps } from '@react-navigation/stack';
import { LoginStackParamList } from '../../App';

export type RegisterAskProps = Omit<
  StackScreenProps<LoginStackParamList>,
  'route'
>;
