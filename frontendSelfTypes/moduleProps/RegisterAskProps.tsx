import { StackScreenProps } from '@react-navigation/stack';
import { LoginStackParamList } from '../../App';

type RegisterAskBase = Omit<StackScreenProps<LoginStackParamList>, 'route'>;

export interface RegisterAskProps extends RegisterAskBase {
  additionalTxtStyles?: string;
  additionalStyles?: string;
  additionalBtnStyles?: string;
}
