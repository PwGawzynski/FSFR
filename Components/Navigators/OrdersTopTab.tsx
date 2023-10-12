import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OrdersTopTabParamList } from '../../FrontendSelfTypes/NavigatorsInterfaces/OrdersTopTabParamList';

import { OrdersStackScreenOptions } from '../../helpers/style/OrdersStackScreenOptions';
import { OrdersAddField } from '../Pages/Mobi/OwnerPages/Orders/OrdersAddField';
import { AssignedWorkers } from '../Pages/Mobi/OwnerPages/Orders/AssignedWorkers';
import { OrdersLocations } from '../Pages/Mobi/OwnerPages/Orders/OrdersLocations';
import { OrdersManageWorkers } from '../Pages/Mobi/OwnerPages/Orders/OrdersManageWorkers';
import { OrdersDetails } from '../Pages/Mobi/OwnerPages/Orders/OrdersDetails';
import { OrderFinishAndAccount } from '../Pages/Mobi/OwnerPages/Orders/OrderFinishAndAccount';
import { OrdersHistory } from '../Pages/Mobi/OwnerPages/Orders/OrdersHistory';
import { MaterialOrdersRootTopTab } from './MaterialOrdersRootTopTab';
import { AllOrders } from '../Pages/Mobi/OwnerPages/Orders/AllOrders';

const TabNavigator = createNativeStackNavigator<OrdersTopTabParamList>();

export function OrdersTopTab() {
  return (
    <TabNavigator.Navigator initialRouteName="ordersRoot">
      <TabNavigator.Screen
        options={OrdersStackScreenOptions}
        name="ordersHistory"
        component={OrdersHistory}
      />
      <TabNavigator.Screen
        options={OrdersStackScreenOptions}
        name="allOrders"
        component={AllOrders}
      />
      <TabNavigator.Screen
        options={OrdersStackScreenOptions}
        name="ordersRoot"
        component={MaterialOrdersRootTopTab}
      />
      <TabNavigator.Screen
        options={OrdersStackScreenOptions}
        name="orderDetails"
        component={OrdersDetails}
      />
      <TabNavigator.Screen
        options={OrdersStackScreenOptions}
        name="ordersAddField"
        component={OrdersAddField}
      />
      <TabNavigator.Screen
        options={OrdersStackScreenOptions}
        name="assignedWorkers"
        component={AssignedWorkers}
      />
      <TabNavigator.Screen
        options={OrdersStackScreenOptions}
        name="ordersFinishAndAccount"
        component={OrderFinishAndAccount}
      />
      <TabNavigator.Screen
        options={OrdersStackScreenOptions}
        name="ordersLocations"
        component={OrdersLocations}
      />
      <TabNavigator.Screen
        options={OrdersStackScreenOptions}
        name="ordersManageWorkers"
        component={OrdersManageWorkers}
      />
    </TabNavigator.Navigator>
  );
}
