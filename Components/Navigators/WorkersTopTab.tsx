import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { WorkersTopTabParamList } from '../../FrontendSelfTypes/NavigatorsInterfaces/WorkersTopTabParamList';
import { WorkersRoot } from '../Pages/Mobi/OwnerPages/Workers/WorkersRoot';
import { topLabelOff } from '../../helpers/style/TopLabelOff';
import { AddOrder } from '../Pages/Mobi/OwnerPages/Orders/AddOrder';
import { WorkerDetails } from '../Pages/Mobi/OwnerPages/Workers/WorkerDetails';
import { WorkerSearch } from '../Pages/Mobi/OwnerPages/Workers/WorkerSearch';
import { WorkersLocations } from '../Pages/Mobi/OwnerPages/Workers/WorkersLocations';
import { WorkerWorkDayDetails } from '../Pages/Mobi/OwnerPages/Workers/WorkerWorkDayDetails';
import { WorkerWorkDaysInfo } from '../Pages/Mobi/OwnerPages/Workers/WorkerWorkDaysInfo';

const TabNavigator = createMaterialTopTabNavigator<WorkersTopTabParamList>();

export function WorkersTabNavigator() {
  return (
    <TabNavigator.Navigator>
      <TabNavigator.Screen
        options={topLabelOff}
        name="workersRoot"
        component={WorkersRoot}
      />
      <TabNavigator.Screen
        options={topLabelOff}
        name="addWorker"
        component={AddOrder}
      />
      <TabNavigator.Screen
        options={topLabelOff}
        name="workerDetails"
        component={WorkerDetails}
      />
      <TabNavigator.Screen
        options={topLabelOff}
        name="workerSearch"
        component={WorkerSearch}
      />
      <TabNavigator.Screen
        options={topLabelOff}
        name="workersLocation"
        component={WorkersLocations}
      />
      <TabNavigator.Screen
        options={topLabelOff}
        name="workerWorkDayDetails"
        component={WorkerWorkDayDetails}
      />
      <TabNavigator.Screen
        options={topLabelOff}
        name="workerWorkDaysInfo"
        component={WorkerWorkDaysInfo}
      />
    </TabNavigator.Navigator>
  );
}
