import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DesktopTopTabParamList } from '../../../../FrontendSelfTypes/NavigatorsInterfaces/DesktopTopTabParamList';
import { DesktopRootMobi } from '../../../Pages/DesktopRootMobi';
import { AddMachine } from '../../../Pages/AddMachine';
import { MaterialTopTabScreenOptions } from '../../../../helpers/style/MaterialTopTabScreenOptions';

const TabNavigator = createMaterialTopTabNavigator<DesktopTopTabParamList>();

export function DesktopTopTab() {
  return (
    <TabNavigator.Navigator initialRouteName="desktopRoot">
      <TabNavigator.Screen
        options={MaterialTopTabScreenOptions}
        name="desktopRoot"
        component={DesktopRootMobi}
      />
      <TabNavigator.Screen
        options={MaterialTopTabScreenOptions}
        name="notifications"
        component={AddMachine}
      />
    </TabNavigator.Navigator>
  );
}
