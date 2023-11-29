import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WorkerRootStackParamList } from '../../../../FrontendSelfTypes/NavigatorsInterfaces/Worker/WorkerRootStackParamList';
import { AssignationCheck } from '../../../Pages/Mobi/WorkerPages/AssignationCheck';
import { WorkerDesktopStack } from './WorkerDesktopStack';
import { OperationConfirmedAnimation } from '../../../Pages/Mobi/Common/OperationConfirmedAnimation';

const Stack = createNativeStackNavigator<WorkerRootStackParamList>();

export function WorkerRootStack() {
  return (
    <Stack.Navigator initialRouteName="assignationCheck">
      <Stack.Screen
        name="assignationCheck"
        component={AssignationCheck}
        options={{
          gestureDirection: 'vertical',
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="desktop"
        component={WorkerDesktopStack}
        options={{
          gestureDirection: 'vertical',
          headerShown: false,
          gestureEnabled: false,
          animation: 'fade',
          animationDuration: 1000,
        }}
      />
      <Stack.Screen
        name="OperationConfirmed"
        component={OperationConfirmedAnimation}
        options={{
          gestureDirection: 'vertical',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
