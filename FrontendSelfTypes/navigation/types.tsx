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
import { OrdersStackParamList } from '../NavigatorsInterfaces/OrdersStackParamList';
import { WorkersStackParamList } from '../NavigatorsInterfaces/WorkersStackParamList';
import { FieldTopTabParamList } from '../NavigatorsInterfaces/FieldTopTabParamList';
import { MaterialOrdersRootTopTabParamList } from '../NavigatorsInterfaces/MaterialOrdersRootTopTabParamLIst';
import { MaterialWorkersRootTopTabParamList } from '../NavigatorsInterfaces/MaterialWorkersRootTopTabParamList';
import { WorkerRootStackParamList } from '../NavigatorsInterfaces/Worker/WorkerRootStackParamList';

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
  T extends keyof OrdersStackParamList,
  N extends keyof OwnerDesktopRootStackParamList,
> = CompositeScreenProps<
  MaterialTopTabScreenProps<OrdersStackParamList, T>,
  OwnerMobiDesktopRootStackProps<N>
>;

export type OwnerWorkersStackProps<
  T extends keyof WorkersStackParamList,
  N extends keyof OwnerDesktopRootStackParamList,
> = CompositeScreenProps<
  MaterialTopTabScreenProps<WorkersStackParamList, T>,
  OwnerMobiDesktopRootStackProps<N>
>;

export type OwnerOrdersMaterialRootProps<
  T extends keyof MaterialOrdersRootTopTabParamList,
  N extends keyof OrdersStackParamList,
  M extends keyof OwnerDesktopRootStackParamList,
> = CompositeScreenProps<
  MaterialTopTabScreenProps<MaterialOrdersRootTopTabParamList, T>,
  OwnerMobiOrdersTopTabProps<N, M>
>;

export type OwnerWorkersMaterialRootProps<
  T extends keyof MaterialWorkersRootTopTabParamList,
  N extends keyof WorkersStackParamList,
  M extends keyof OwnerDesktopRootStackParamList,
> = CompositeScreenProps<
  MaterialTopTabScreenProps<MaterialWorkersRootTopTabParamList, T>,
  OwnerWorkersStackProps<N, M>
>;

export type OwnerWorkersMaterialRootNavigation<
  T extends keyof MaterialWorkersRootTopTabParamList,
  N extends keyof WorkersStackParamList,
  M extends keyof OwnerDesktopRootStackParamList,
> = CompositeScreenProps<
  MaterialTopTabScreenProps<MaterialWorkersRootTopTabParamList, T>,
  OwnerWorkersStackProps<N, M>
>['navigation'];

export type OwnerWorkersMaterialRootRouteParams<
  T extends keyof MaterialWorkersRootTopTabParamList,
  N extends keyof WorkersStackParamList,
  M extends keyof OwnerDesktopRootStackParamList,
> = CompositeScreenProps<
  MaterialTopTabScreenProps<MaterialWorkersRootTopTabParamList, T>,
  OwnerWorkersStackProps<N, M>
>['route'];

export type OwnerOrdersMaterialRootNavigationProps<
  T extends keyof MaterialOrdersRootTopTabParamList,
  N extends keyof OrdersStackParamList,
  M extends keyof OwnerDesktopRootStackParamList,
> = CompositeScreenProps<
  MaterialTopTabScreenProps<MaterialOrdersRootTopTabParamList, T>,
  OwnerMobiOrdersTopTabProps<N, M>
>['navigation'];

export type OwnerOrdersMaterialRootRouteProps<
  T extends keyof MaterialOrdersRootTopTabParamList,
> = MaterialTopTabScreenProps<MaterialOrdersRootTopTabParamList, T>['route'];

export type OwnerMobiFieldsTopTabProps<
  T extends keyof FieldTopTabParamList,
  N extends keyof OwnerDesktopRootStackParamList,
> = CompositeScreenProps<
  MaterialTopTabScreenProps<FieldTopTabParamList, T>,
  OwnerMobiDesktopRootStackProps<N>
>;

export type WorkerRootStackProps<T extends keyof WorkerRootStackParamList> =
  StackScreenProps<WorkerRootStackParamList, T>;
