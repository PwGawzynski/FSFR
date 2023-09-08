import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { OwnerDesktopRootStackParamList } from '../../FrontendSelfTypes/NavigatorsInterfaces/OwnerDesktopRootStackParamList';
import { WorkersTabNavigator } from './WorkersTopTab';
import { OrdersTopTab } from './OrdersTopTab';
import { DesktopTopTab } from './DesktopTopTab';
import { OperationConfirmedAnimation } from '../Pages/Mobi/Common/OperationConfirmedAnimation';
import { OperationDanger } from '../Pages/Mobi/Common/OperationDanger';

const Stack = createStackNavigator<OwnerDesktopRootStackParamList>();

export function OwnerDesktopMobiRootStack() {
  return (
    <Stack.Navigator initialRouteName="desktop">
      <Stack.Screen
        name="desktop"
        component={DesktopTopTab}
        options={{
          headerShown: false,
          gestureDirection: 'vertical',
          gestureResponseDistance: 800,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name="orders"
        component={OrdersTopTab}
        options={{
          headerShown: false,
          gestureDirection: 'vertical',
          gestureResponseDistance: 800,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name="workers"
        component={WorkersTabNavigator}
        options={{
          headerShown: false,
          gestureDirection: 'vertical',
          gestureResponseDistance: 800,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name="OperationConfirmed"
        component={OperationConfirmedAnimation}
        options={{
          headerShown: false,
          gestureDirection: 'vertical',
          gestureResponseDistance: 800,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
      />
      <Stack.Screen
        name="OperationDanger"
        component={OperationDanger}
        options={{
          headerShown: false,
          gestureDirection: 'vertical',
          gestureResponseDistance: 800,
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        }}
      />
    </Stack.Navigator>
  );
}
