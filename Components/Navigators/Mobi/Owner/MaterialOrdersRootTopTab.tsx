import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialOrdersRootTopTabParamList } from '../../../../FrontendSelfTypes/NavigatorsInterfaces/MaterialOrdersRootTopTabParamLIst';
import { OrdersRoot } from '../../../Pages/Mobi/OwnerPages/Orders/OrdersRoot';
import { AddOrder } from '../../../Pages/Mobi/OwnerPages/Orders/AddOrder';
import { OrdersSearch } from '../../../Pages/Mobi/OwnerPages/Orders/OrdersSearch';
import { MaterialTopTabScreenOptions } from '../../../../helpers/style/MaterialTopTabScreenOptions';

const MaterialTopTab =
  createMaterialTopTabNavigator<MaterialOrdersRootTopTabParamList>();

export function MaterialOrdersRootTopTab() {
  return (
    <MaterialTopTab.Navigator initialRouteName="materialOrdersRoot">
      <MaterialTopTab.Screen
        options={MaterialTopTabScreenOptions}
        name="addOrder"
        component={AddOrder}
      />
      <MaterialTopTab.Screen
        options={MaterialTopTabScreenOptions}
        name="materialOrdersRoot"
        component={OrdersRoot}
      />
      <MaterialTopTab.Screen
        options={MaterialTopTabScreenOptions}
        name="ordersSearch"
        component={OrdersSearch}
      />
    </MaterialTopTab.Navigator>
  );
}
