import { DeviceType } from 'expo-device';
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginPage } from '../Pages/LoginPage';
import { LoginPageTab } from '../Pages/LoginPageTab';
import { RegisterMobi } from '../Pages/RegisterMobi';
import { RegisterTab } from '../Pages/RegisterTab';
import { ResetPassword } from '../Pages/ResetPassword';
import { AuthCode } from '../Pages/AuthCode';
import { LoginStackParamList } from '../../FrontendSelfTypes/NavigatorsInterfaces/LoginStackParamList';
import { AppSettings } from '../../helpers/appSettings/contexts';

export function LoginRegisterStack() {
  const Stack = createStackNavigator<LoginStackParamList>();
  const { deviceType } = useContext(AppSettings).settings;

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={deviceType === DeviceType.PHONE ? LoginPage : LoginPageTab}
      />
      <Stack.Screen
        name="Register"
        component={deviceType === DeviceType.PHONE ? RegisterMobi : RegisterTab}
      />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="AuthCode" component={AuthCode} />
    </Stack.Navigator>
  );
}
