import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { OwnerDesktopRootStackParamList } from '../../../../FrontendSelfTypes/NavigatorsInterfaces/OwnerDesktopRootStackParamList';
import { OrdersStack } from './OrdersStack';
import { DesktopTopTab } from './DesktopTopTab';
import { OperationConfirmedAnimation } from '../../../Pages/Mobi/Common/OperationConfirmedAnimation';
import { OperationDanger } from '../../../Pages/Mobi/Common/OperationDanger';
import { FieldsTopTab } from './FieldsTopTab';
import { WorkersTabNavigator } from './WorkersStack';
import { TakePhoto } from '../../../Pages/Mobi/Common/TakePhoto';
import { CreateCompany, CreateCompanyI } from '../../../Pages/CreateCompany';
import { Landing } from '../../../Pages/Landing';

const Stack = createNativeStackNavigator<OwnerDesktopRootStackParamList>();

export function OwnerDesktopMobiRootStack() {
  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen
        name="CreateCompany"
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
        component={CreateCompany}
      />
      <Stack.Screen
        name="desktop"
        component={DesktopTopTab}
        options={{
          gestureDirection: 'vertical',
          headerShown: false,
          animation: 'fade',
          gestureEnabled: true,
        }}
      />

      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="orders"
        component={OrdersStack}
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
      <Stack.Screen
        name="takePhoto"
        component={TakePhoto}
        options={{
          gestureDirection: 'vertical',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
