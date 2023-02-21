import { StackScreenProps } from '@react-navigation/stack';
import { LoginStackParamList } from '../../App';

type ForgotPasswordBase = Omit<StackScreenProps<LoginStackParamList>, 'route'>;

export interface ForgotPasswordProps extends ForgotPasswordBase {
  additionalTxtStyles?: string;
  additionalBtnStyles?: string;
  additionalStyles?: string;
}
