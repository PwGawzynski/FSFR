import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
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
export type RegisterAskBase = Omit<
  StackScreenProps<LoginStackParamList>,
  'route'
>;

export type RegisterMobiPropsBase<T extends keyof RegisterStackParamList> =
  CompositeScreenProps<
    StackScreenProps<RegisterStackParamList, T>,
    StackScreenProps<LoginStackParamList>
  >;

export type RegisterMobiNavigation<T extends keyof LoginStackParamList> =
  NativeStackNavigationProp<LoginStackParamList, T>;
