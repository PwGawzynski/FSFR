import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
} from '@react-navigation/native';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { RootStackParamList } from '../NavigatorsInterfaces/RootStackParamList';
import { RegisterStackParamList } from '../NavigatorsInterfaces/RegisterStack';
import { OwnerDesktopRootStackParamList } from '../NavigatorsInterfaces/OwnerDesktopRootStackParamList';
import { DesktopTopTabParamList } from '../NavigatorsInterfaces/DesktopTopTabParamList';
import { OrdersTopTabParamList } from '../NavigatorsInterfaces/OrdersTopTabParamList';
import { WorkersTopTabParamList } from '../NavigatorsInterfaces/WorkersTopTabParamList';
import { FieldTopTabParamList } from '../NavigatorsInterfaces/FieldTopTabParamList';
import { MaterialOrdersRootTopTabParamList } from '../NavigatorsInterfaces/MaterialOrdersRootTopTabParamLIst';

export type LoginPageBase = StackScreenProps<RootStackParamList, 'Login'>;
export type LoginPageTabBase = LoginPageBase;
export type RegisterMobiBase = CompositeScreenProps<
  StackScreenProps<RootStackParamList, 'Register'>,
  StackScreenProps<RegisterStackParamList>
>;
export type ForgotPasswordBase = Omit<
  StackScreenProps<RootStackParamList>,
  'route'
>;
export type LoginBase = Omit<StackScreenProps<RootStackParamList>, 'route'>;
export type RegisterTabBase = StackScreenProps<RootStackParamList, 'Register'>;
export type RegisterAskBase = Omit<
  StackScreenProps<RootStackParamList>,
  'route'
>;
export type RegisterTabFormBase = Omit<
  StackScreenProps<RootStackParamList>,
  'route'
>;

export type RegisterMobiPropsBase<T extends keyof RegisterStackParamList> =
  CompositeScreenProps<
    StackScreenProps<RegisterStackParamList, T>,
    StackScreenProps<RootStackParamList>
  >;

export type RegisterScreenNavBaseProps<T extends keyof RegisterStackParamList> =
  CompositeNavigationProp<
    StackNavigationProp<RegisterStackParamList, T>,
    StackNavigationProp<RootStackParamList>
  >;

export type OwnerMobiDesktopRootStackProps<
  T extends keyof OwnerDesktopRootStackParamList,
> = StackScreenProps<OwnerDesktopRootStackParamList, T>;

export type OwnerMobiDesktopTopTabProps<
  T extends keyof DesktopTopTabParamList,
  N extends keyof OwnerDesktopRootStackParamList,
> = CompositeScreenProps<
  MaterialTopTabScreenProps<DesktopTopTabParamList, T>,
  OwnerMobiDesktopRootStackProps<N>
>;

export type OwnerMobiOrdersTopTabProps<
  T extends keyof OrdersTopTabParamList,
  N extends keyof OwnerDesktopRootStackParamList,
> = CompositeScreenProps<
  MaterialTopTabScreenProps<OrdersTopTabParamList, T>,
  OwnerMobiDesktopRootStackProps<N>
>;

export type OwnerOrdersMaterialRootProps<
  T extends keyof MaterialOrdersRootTopTabParamList,
  N extends keyof OrdersTopTabParamList,
  M extends keyof OwnerDesktopRootStackParamList,
> = CompositeScreenProps<
  MaterialTopTabScreenProps<MaterialOrdersRootTopTabParamList, T>,
  OwnerMobiOrdersTopTabProps<N, M>
>;

export type OwnerOrdersMaterialRootNavigationProps<
  T extends keyof MaterialOrdersRootTopTabParamList,
  N extends keyof OrdersTopTabParamList,
  M extends keyof OwnerDesktopRootStackParamList,
> = CompositeScreenProps<
  MaterialTopTabScreenProps<MaterialOrdersRootTopTabParamList, T>,
  OwnerMobiOrdersTopTabProps<N, M>
>['navigation'];

export type OwnerOrdersMaterialRootRouteProps<
  T extends keyof MaterialOrdersRootTopTabParamList,
> = MaterialTopTabScreenProps<MaterialOrdersRootTopTabParamList, T>['route'];

export type OwnerMobiWorkersTopTabProps<
  T extends keyof WorkersTopTabParamList,
  N extends keyof OwnerDesktopRootStackParamList,
> = CompositeScreenProps<
  MaterialTopTabScreenProps<WorkersTopTabParamList, T>,
  OwnerMobiDesktopRootStackProps<N>
>;

export type OwnerMobiFieldsTopTabProps<
  T extends keyof FieldTopTabParamList,
  N extends keyof OwnerDesktopRootStackParamList,
> = CompositeScreenProps<
  MaterialTopTabScreenProps<FieldTopTabParamList, T>,
  OwnerMobiDesktopRootStackProps<N>
>;
