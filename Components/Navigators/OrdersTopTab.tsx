import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { OrdersTopTabParamList } from '../../FrontendSelfTypes/NavigatorsInterfaces/OrdersTopTabParamList';

import { topLabelOff } from '../../helpers/style/TopLabelOff';
import { OrdersRoot } from '../Pages/Mobi/OwnerPages/Orders/OrdersRoot';
import { AddOrder } from '../Pages/Mobi/OwnerPages/Orders/AddOrder';
import { OrdersDetails } from '../Pages/Mobi/OwnerPages/Orders/OrdfersDetails';
import { AllOrders } from '../Pages/Mobi/OwnerPages/Orders/AllOrders';
import { OrdersSearch } from '../Pages/Mobi/OwnerPages/Orders/OrdersSearch';
import { OrdersAddField } from '../Pages/Mobi/OwnerPages/Orders/OrdersAddField';
import { OrdersAddWorker } from '../Pages/Mobi/OwnerPages/Orders/OrdersAddWorker';
import { OrdersLocations } from '../Pages/Mobi/OwnerPages/Orders/OrdersLocations';
import { OrdersManageWorkers } from '../Pages/Mobi/OwnerPages/Orders/OrdersManageWorkers';
import { OrderFinishAndAccount } from '../Pages/Mobi/OwnerPages/Orders/OrderFinishAndAccount';

const TabNavigator = createMaterialTopTabNavigator<OrdersTopTabParamList>();

export function OrdersTopTab() {
  return (
    <TabNavigator.Navigator>
      <TabNavigator.Screen
        options={topLabelOff}
        name="ordersRoot"
        component={OrdersRoot}
      />
      <TabNavigator.Screen
        options={topLabelOff}
        name="addOrder"
        component={AddOrder}
      />
      <TabNavigator.Screen
        options={topLabelOff}
        name="orderDetails"
        component={OrdersDetails}
      />
      <TabNavigator.Screen
        options={topLabelOff}
        name="allOrders"
        component={AllOrders}
      />
      <TabNavigator.Screen
        options={topLabelOff}
        name="ordersSearch"
        component={OrdersSearch}
      />
      <TabNavigator.Screen
        options={topLabelOff}
        name="ordersAddField"
        component={OrdersAddField}
      />
      <TabNavigator.Screen
        options={topLabelOff}
        name="ordersAddWorker"
        component={OrdersAddWorker}
      />
      <TabNavigator.Screen
        options={topLabelOff}
        name="ordersFinishAndAccount"
        component={OrdersAddField}
      />
      <TabNavigator.Screen
        options={topLabelOff}
        name="ordersLocations"
        component={OrdersLocations}
      />
      <TabNavigator.Screen
        options={topLabelOff}
        name="ordersManageWorkers"
        component={OrdersManageWorkers}
      />
      <TabNavigator.Screen
        options={topLabelOff}
        name="ordersFinishAndAccount"
        component={OrderFinishAndAccount}
      />
    </TabNavigator.Navigator>
  );
}
