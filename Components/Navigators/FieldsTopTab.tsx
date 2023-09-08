import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FieldTopTabParamList } from '../../FrontendSelfTypes/NavigatorsInterfaces/FieldTopTabParamList';
import { FieldDetails } from '../Pages/Mobi/OwnerPages/Fields/FieldDetails';

export function FieldsTopTab() {
  const TabNavigator = createMaterialTopTabNavigator<FieldTopTabParamList>();

  return (
    <TabNavigator.Navigator>
      <TabNavigator.Screen name="fieldDetails" component={FieldDetails} />
    </TabNavigator.Navigator>
  );
}
