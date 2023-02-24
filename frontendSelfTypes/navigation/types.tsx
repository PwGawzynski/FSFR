import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { LoginStackParamList } from '../NavigatorsInterfaces/LoginStackParamList';
import { RegisterStackParamList } from '../NavigatorsInterfaces/RegisterStack';

export type LoginPageBase = StackScreenProps<LoginStackParamList, 'Login'>;
export type LoginPageTabBase = LoginPageBase;
export type RegisterMobiBase = CompositeScreenProps<
  StackScreenProps<LoginStackParamList, 'Register'>,
  StackScreenProps<RegisterStackParamList>
>;
export type ForgotPasswordBase = Omit<
  StackScreenProps<LoginStackParamList>,
  'route'
>;
export type LoginBase = Omit<StackScreenProps<LoginStackParamList>, 'route'>;
export type RegisterTabBase = StackScreenProps<LoginStackParamList, 'Register'>;
export type EmailAndPasswordBase = CompositeScreenProps<
  StackScreenProps<RegisterStackParamList, 'EmailAndPassword'>,
  StackScreenProps<LoginStackParamList>
>;
export type RegisterAskBase = Omit<
  StackScreenProps<LoginStackParamList>,
  'route'
>;

export type PersonalDataBase = CompositeScreenProps<
  StackScreenProps<RegisterStackParamList, 'PersonalData'>,
  StackScreenProps<LoginStackParamList>
>;
