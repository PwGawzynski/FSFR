import { NavigatorScreenParams } from '@react-navigation/native';
import { DesktopTopTabParamList } from './DesktopTopTabParamList';
import { OrdersStackParamList } from './OrdersStackParamList';
import { WorkersStackParamList } from './WorkersStackParamList';
import { FieldTopTabParamList } from './FieldTopTabParamList';
import { MaterialWorkersRootTopTabParamList } from './MaterialWorkersRootTopTabParamList';
import { MaterialOrdersRootTopTabParamList } from './MaterialOrdersRootTopTabParamLIst';

export type OwnerDesktopRootStackParamList = {
  desktop: NavigatorScreenParams<DesktopTopTabParamList> | undefined;
  orders: NavigatorScreenParams<OrdersStackParamList> | undefined;
  workers: NavigatorScreenParams<WorkersStackParamList> | undefined;
  OperationConfirmed: {
    redirectScreenName:
      | keyof OwnerDesktopRootStackParamList
      | keyof DesktopTopTabParamList
      | keyof OrdersStackParamList
      | keyof WorkersStackParamList
      | keyof MaterialWorkersRootTopTabParamList
      | keyof FieldTopTabParamList
      | keyof MaterialOrdersRootTopTabParamList;
    shownMessage?: string;
  };
  OperationDanger: {
    shownMessage?: string | Array<string>;
    afterDangerScreenName:
      | keyof OwnerDesktopRootStackParamList
      | keyof DesktopTopTabParamList
      | keyof OrdersStackParamList
      | keyof WorkersStackParamList
      | keyof MaterialWorkersRootTopTabParamList
      | keyof FieldTopTabParamList
      | keyof MaterialOrdersRootTopTabParamList;
    dangerButtonSign?: string;
  };
  fields: NavigatorScreenParams<FieldTopTabParamList> | undefined;
  takePhoto: {
    onSuccessRedirectionLink?: string;
  };
};
