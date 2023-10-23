import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WorkersStackParamList } from '../../FrontendSelfTypes/NavigatorsInterfaces/WorkersStackParamList';
import { OrdersStackScreenOptions } from '../../helpers/style/OrdersStackScreenOptions';
import { WorkerDetails } from '../Pages/Mobi/OwnerPages/Workers/WorkerDetails';
import { WorkersLocations } from '../Pages/Mobi/OwnerPages/Workers/WorkersLocations';
import { WorkerWorkDayDetails } from '../Pages/Mobi/OwnerPages/Workers/WorkerWorkDayDetails';
import { WorkerWorkDaysInfo } from '../Pages/Mobi/OwnerPages/Workers/WorkerWorkDaysInfo';
import { MaterialWorkersTopTab } from './MaterialWorkersTopTab';

const TabNavigator = createNativeStackNavigator<WorkersStackParamList>();

export function WorkersTabNavigator() {
  return (
    <TabNavigator.Navigator initialRouteName="workersRoot">
      <TabNavigator.Screen
        options={OrdersStackScreenOptions}
        name="workersRoot"
        component={MaterialWorkersTopTab}
      />
      <TabNavigator.Screen
        options={OrdersStackScreenOptions}
        name="workerDetails"
        component={WorkerDetails}
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
