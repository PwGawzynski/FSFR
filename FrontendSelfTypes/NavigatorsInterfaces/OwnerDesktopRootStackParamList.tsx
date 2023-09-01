import { NavigatorScreenParams } from '@react-navigation/native';
import { DesktopTopTabParamList } from './DesktopTopTabParamList';
import { OrdersTopTabParamList } from './OrdersTopTabParamList';
import { WorkersTopTabParamList } from './WorkersTopTabParamList';

export type OwnerDesktopRootStackParamList = {
  desktop: NavigatorScreenParams<DesktopTopTabParamList>;
  orders: NavigatorScreenParams<OrdersTopTabParamList>;
  workers: NavigatorScreenParams<WorkersTopTabParamList>;
  OperationConfirmed: {
    redirectScreenName:
      | keyof OwnerDesktopRootStackParamList
      | keyof DesktopTopTabParamList
      | keyof OrdersTopTabParamList
      | keyof WorkersTopTabParamList;
    shownMessage?: string;
  };
};
