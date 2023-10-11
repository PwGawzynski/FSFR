import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OwnerDesktopRootStackParamList } from '../../FrontendSelfTypes/NavigatorsInterfaces/OwnerDesktopRootStackParamList';
import { WorkersTabNavigator } from './WorkersTopTab';
import { OrdersTopTab } from './OrdersTopTab';
import { DesktopTopTab } from './DesktopTopTab';
import { OperationConfirmedAnimation } from '../Pages/Mobi/Common/OperationConfirmedAnimation';
import { OperationDanger } from '../Pages/Mobi/Common/OperationDanger';
import { FieldsTopTab } from './FieldsTopTab';

const Stack = createNativeStackNavigator<OwnerDesktopRootStackParamList>();

export function OwnerDesktopMobiRootStack() {
  return (
    <Stack.Navigator initialRouteName="desktop">
      <Stack.Screen
        name="desktop"
        component={DesktopTopTab}
        options={{
          gestureDirection: 'vertical',
          headerShown: false,
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="orders"
        component={OrdersTopTab}
        options={{
          gestureDirection: 'vertical',
          headerShown: false,
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="workers"
        component={WorkersTabNavigator}
        options={{
          gestureDirection: 'vertical',
          headerShown: false,
          gestureEnabled: true,
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
      <Stack.Screen
        name="OperationDanger"
        component={OperationDanger}
        options={{
          gestureDirection: 'vertical',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="fields"
        component={FieldsTopTab}
        options={{
          gestureDirection: 'vertical',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
