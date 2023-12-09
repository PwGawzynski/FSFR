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

  ordersAddField: { orderId?: string };

  allOrders: undefined;

  ordersFinishAndAccount: { orderId?: string };

  AddMachine: { taskId?: string; orderId?: string };
};
