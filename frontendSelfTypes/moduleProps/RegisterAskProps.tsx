import { StackScreenProps } from '@react-navigation/stack';
import { LoginStackParamList } from '../../App';

type RegisterAskBase = Omit<StackScreenProps<LoginStackParamList>, 'route'>;

export interface RegisterAskProps extends RegisterAskBase {
  additionalStyles?: string;
  additionalBtnStyles?: string;
}
