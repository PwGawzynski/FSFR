import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialWorkersRootTopTabParamList } from '../../FrontendSelfTypes/NavigatorsInterfaces/MaterialWorkersRootTopTabParamList';
import { WorkersRoot } from '../Pages/Mobi/OwnerPages/Workers/WorkersRoot';
import { MaterialTopTabScreenOptions } from '../../helpers/style/MaterialTopTabScreenOptions';
import { AddWorker } from '../Pages/Mobi/OwnerPages/Workers/AddWorker';
import { WorkerSearch } from '../Pages/Mobi/OwnerPages/Workers/WorkerSearch';

const MaterialWorkersTopTabNavigator =
  createMaterialTopTabNavigator<MaterialWorkersRootTopTabParamList>();

export function MaterialWorkersTopTab() {
  return (
    <MaterialWorkersTopTabNavigator.Navigator initialRouteName="materialWorkersRoot">
      <MaterialWorkersTopTabNavigator.Screen
        name="addWorker"
        component={AddWorker}
        options={MaterialTopTabScreenOptions}
      />
      <MaterialWorkersTopTabNavigator.Screen
        name="materialWorkersRoot"
        component={WorkersRoot}
        options={MaterialTopTabScreenOptions}
      />
      <MaterialWorkersTopTabNavigator.Screen
        name="searchWorker"
        component={WorkerSearch}
        options={MaterialTopTabScreenOptions}
      />
    </MaterialWorkersTopTabNavigator.Navigator>
  );
}
