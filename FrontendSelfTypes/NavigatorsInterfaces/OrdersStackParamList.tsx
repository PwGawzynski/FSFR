import { MaterialOrdersRootTopTabParamList } from './MaterialOrdersRootTopTabParamLIst';

export type OrdersStackParamList = {
  ordersRoot: MaterialOrdersRootTopTabParamList;
  ordersLocations: undefined;

  orderDetails: {
    orderId: string | undefined;
  };
  ordersHistory: undefined;

  ordersManageWorkers: { orderId?: string };

  assignedWorkers: { orderId?: string };

  ordersAddField: undefined;

  allOrders: undefined;

  ordersFinishAndAccount: { orderId?: string };
};
