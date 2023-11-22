import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WorkerStackParamList } from '../../../../FrontendSelfTypes/NavigatorsInterfaces/Worker/WorkerStackParamList';
import { WorkerDesktopMaterial } from './WorkerDesktopMaterial';

const Stack = createNativeStackNavigator<WorkerStackParamList>();

export function WorkerDesktopStack() {
  return (
    <Stack.Navigator initialRouteName="root">
      <Stack.Screen
        name="root"
        component={WorkerDesktopMaterial}
        options={{
          headerShown: false,
          gestureEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
}
