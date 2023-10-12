import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FieldTopTabParamList } from '../../FrontendSelfTypes/NavigatorsInterfaces/FieldTopTabParamList';
import { FieldDetails } from '../Pages/Mobi/OwnerPages/Fields/FieldDetails';
import { OrdersStackScreenOptions } from '../../helpers/style/OrdersStackScreenOptions';

export function FieldsTopTab() {
  const TabNavigator = createMaterialTopTabNavigator<FieldTopTabParamList>();

  return (
    <TabNavigator.Navigator initialRouteName="fieldDetails">
      <TabNavigator.Screen
        options={OrdersStackScreenOptions}
        name="fieldDetails"
        component={FieldDetails}
      />
    </TabNavigator.Navigator>
  );
}
