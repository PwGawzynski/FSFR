import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { topLabelOff } from '../../helpers/style/TopLabelOff';
import { DesktopTopTabParamList } from '../../FrontendSelfTypes/NavigatorsInterfaces/DesktopTopTabParamList';
import { DesktopRootMobi } from '../Pages/DesktopRootMobi';
import { DesktopNotificationCenter } from '../Pages/DesktopNotificationCenter';

const TabNavigator = createMaterialTopTabNavigator<DesktopTopTabParamList>();

export function DesktopTopTab() {
  return (
    <TabNavigator.Navigator initialRouteName="desktopRoot">
      <TabNavigator.Screen
        options={topLabelOff}
        name="desktopRoot"
        component={DesktopRootMobi}
      />
      <TabNavigator.Screen
        options={topLabelOff}
        name="notifications"
        component={DesktopNotificationCenter}
      />
    </TabNavigator.Navigator>
  );
}
