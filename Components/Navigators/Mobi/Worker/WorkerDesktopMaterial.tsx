import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { WorkerDesktopMaterialParamList } from '../../../../FrontendSelfTypes/NavigatorsInterfaces/Worker/WorkerDesktopMaterialParamList';
import { Desktop } from '../../../Pages/Mobi/WorkerPages/Desktop';
import { MaterialTopTabScreenOptions } from '../../../../helpers/style/MaterialTopTabScreenOptions';

const Material =
  createMaterialTopTabNavigator<WorkerDesktopMaterialParamList>();

export function WorkerDesktopMaterial() {
  return (
    <Material.Navigator initialRouteName="materialDesktop">
      <Material.Screen
        name="materialDesktop"
        component={Desktop}
        options={MaterialTopTabScreenOptions}
      />
    </Material.Navigator>
  );
}
