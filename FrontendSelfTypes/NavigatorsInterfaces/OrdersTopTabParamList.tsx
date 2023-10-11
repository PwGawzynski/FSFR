export type OrdersTopTabParamList = {
  ordersRoot: undefined;
  addOrder: undefined;

  ordersLocations: undefined;

  orderDetails: {
    orderId: string | undefined;
  };
  ordersHistory: undefined;

  ordersManageWorkers: undefined;

  assignedWorkers: { orderId?: string };

  ordersAddField: undefined;

  allOrders: undefined;

  ordersFinishAndAccount: { orderId?: string };

  ordersSearch: undefined;
};
