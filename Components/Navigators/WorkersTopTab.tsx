import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { WorkersTopTabParamList } from '../../FrontendSelfTypes/NavigatorsInterfaces/WorkersTopTabParamList';
import { WorkersRoot } from '../Pages/Mobi/OwnerPages/Workers/WorkersRoot';
import { OrdersStackScreenOptions } from '../../helpers/style/OrdersStackScreenOptions';
import { WorkerDetails } from '../Pages/Mobi/OwnerPages/Workers/WorkerDetails';
import { WorkerSearch } from '../Pages/Mobi/OwnerPages/Workers/WorkerSearch';
import { WorkersLocations } from '../Pages/Mobi/OwnerPages/Workers/WorkersLocations';
import { WorkerWorkDayDetails } from '../Pages/Mobi/OwnerPages/Workers/WorkerWorkDayDetails';
import { WorkerWorkDaysInfo } from '../Pages/Mobi/OwnerPages/Workers/WorkerWorkDaysInfo';
import { AddWorker } from '../Pages/Mobi/OwnerPages/Workers/AddWorker';

const TabNavigator = createMaterialTopTabNavigator<WorkersTopTabParamList>();

export function WorkersTabNavigator() {
  return (
    <TabNavigator.Navigator initialRouteName="workersRoot">
      <TabNavigator.Screen
        options={OrdersStackScreenOptions}
        name="workersRoot"
        component={WorkersRoot}
      />
      <TabNavigator.Screen
        options={OrdersStackScreenOptions}
        name="addWorker"
        component={AddWorker}
      />
      <TabNavigator.Screen
        options={OrdersStackScreenOptions}
        name="workerDetails"
        component={WorkerDetails}
      />
      <TabNavigator.Screen
        options={OrdersStackScreenOptions}
        name="workerSearch"
        component={WorkerSearch}
      />
      <TabNavigator.Screen
        options={OrdersStackScreenOptions}
        name="workersLocation"
        component={WorkersLocations}
      />
      <TabNavigator.Screen
        options={OrdersStackScreenOptions}
        name="workerWorkDayDetails"
        component={WorkerWorkDayDetails}
      />
      <TabNavigator.Screen
        options={OrdersStackScreenOptions}
        name="workerWorkDaysInfo"
        component={WorkerWorkDaysInfo}
      />
    </TabNavigator.Navigator>
  );
}
