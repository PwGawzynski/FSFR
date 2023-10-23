import { NavigatorScreenParams } from '@react-navigation/native';
import { DesktopTopTabParamList } from './DesktopTopTabParamList';
import { OrdersStackParamList } from './OrdersStackParamList';
import { WorkersStackParamList } from './WorkersStackParamList';
import { FieldTopTabParamList } from './FieldTopTabParamList';

export type OwnerDesktopRootStackParamList = {
  desktop: NavigatorScreenParams<DesktopTopTabParamList> | undefined;
  orders: NavigatorScreenParams<OrdersStackParamList> | undefined;
  workers: NavigatorScreenParams<WorkersStackParamList> | undefined;
  OperationConfirmed: {
    redirectScreenName:
      | keyof OwnerDesktopRootStackParamList
      | keyof DesktopTopTabParamList
      | keyof OrdersStackParamList
      | keyof WorkersStackParamList;
    shownMessage?: string;
  };
  OperationDanger: {
    shownMessage?: string | Array<string>;
    afterDangerScreenName:
      | keyof OwnerDesktopRootStackParamList
      | keyof DesktopTopTabParamList
      | keyof OrdersStackParamList
      | keyof WorkersStackParamList;
    dangerButtonSign?: string;
  };
  fields: NavigatorScreenParams<FieldTopTabParamList> | undefined;
};
