import { NavigatorScreenParams } from '@react-navigation/native';
import { DesktopTopTabParamList } from './DesktopTopTabParamList';
import { OrdersTopTabParamList } from './OrdersTopTabParamList';
import { WorkersTopTabParamList } from './WorkersTopTabParamList';
import { FieldTopTabParamList } from './FieldTopTabParamList';

export type OwnerDesktopRootStackParamList = {
  desktop: NavigatorScreenParams<DesktopTopTabParamList> | undefined;
  orders: NavigatorScreenParams<OrdersTopTabParamList> | undefined;
  workers: NavigatorScreenParams<WorkersTopTabParamList> | undefined;
  OperationConfirmed: {
    redirectScreenName:
      | keyof OwnerDesktopRootStackParamList
      | keyof DesktopTopTabParamList
      | keyof OrdersTopTabParamList
      | keyof WorkersTopTabParamList;
    shownMessage?: string;
  };
  OperationDanger: {
    shownMessage?: string | Array<string>;
    afterDangerScreenName:
      | keyof OwnerDesktopRootStackParamList
      | keyof DesktopTopTabParamList
      | keyof OrdersTopTabParamList
      | keyof WorkersTopTabParamList;
    dangerButtonSign?: string;
  };
  fields: NavigatorScreenParams<FieldTopTabParamList> | undefined;
};
