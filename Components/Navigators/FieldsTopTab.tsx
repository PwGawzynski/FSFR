import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FieldTopTabParamList } from '../../FrontendSelfTypes/NavigatorsInterfaces/FieldTopTabParamList';
import { FieldDetails } from '../Pages/Mobi/OwnerPages/Fields/FieldDetails';
import { topLabelOff } from '../../helpers/style/TopLabelOff';

export function FieldsTopTab() {
  const TabNavigator = createMaterialTopTabNavigator<FieldTopTabParamList>();

  return (
    <TabNavigator.Navigator>
      <TabNavigator.Screen
        options={topLabelOff}
        name="fieldDetails"
        component={FieldDetails}
      />
    </TabNavigator.Navigator>
  );
}
