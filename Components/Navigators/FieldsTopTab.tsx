import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FieldTopTabParamList } from '../../FrontendSelfTypes/NavigatorsInterfaces/FieldTopTabParamList';
import { FieldDetails } from '../Pages/Mobi/OwnerPages/Fields/FieldDetails';
import { MaterialTopTabScreenOptions } from '../../helpers/style/MaterialTopTabScreenOptions';

export function FieldsTopTab() {
  const TabNavigator = createMaterialTopTabNavigator<FieldTopTabParamList>();

  return (
    <TabNavigator.Navigator initialRouteName="fieldDetails">
      <TabNavigator.Screen
        options={MaterialTopTabScreenOptions}
        name="fieldDetails"
        component={FieldDetails}
      />
    </TabNavigator.Navigator>
  );
}
