import 'react-native-gesture-handler';
import React, { useEffect, useMemo, useState } from 'react';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as Device from 'expo-device';
import { DeviceType } from 'expo-device';
import { AppSettings, ThemeOptions } from './helpers/appSettings/contexts';
import { ResetPassword } from './Components/Pages/ResetPassword';
import { AuthCode } from './Components/Pages/AuthCode';
import { LoginPage } from './Components/Pages/LoginPage';
import { LoginPageTab } from './Components/Pages/LoginPageTab';
import { RegisterTab } from './Components/Pages/RegisterTab';
import { RegisterMobi } from './Components/Pages/RegisterMobi';
import { RegisterStackParamList } from './frontendSelfTypes/NavigatorsInterfaces/RegisterStack';

export type LoginStackParamList = {
  Login: undefined;
  Register: StackScreenProps<RegisterStackParamList> | undefined;
  AuthCode: undefined;
  ResetPassword: undefined;
};

export default function App() {
  const [settings, setSettings] = useState(ThemeOptions.light);
  const [deviceType, setDeviceType] = useState(DeviceType.UNKNOWN);

  const memoSettings = useMemo(
    () => ({
      settings: {
        theme: settings,
        deviceType,
      },
      setters: {
        setTheme: setSettings,
        setDeviceType,
      },
    }),
    [settings, deviceType],
  );
  useEffect(() => {
    (async () => {
      const recognizedDeviceType = await Device.getDeviceTypeAsync();
      setDeviceType(recognizedDeviceType);
    })();
  });

  const Stack = createStackNavigator<LoginStackParamList>();
  return (
    <NavigationContainer>
      <AppSettings.Provider value={memoSettings}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Login"
            component={
              deviceType === DeviceType.PHONE ? LoginPage : LoginPageTab
            }
          />
          <Stack.Screen
            name="Register"
            component={
              deviceType === DeviceType.PHONE ? RegisterMobi : RegisterTab
            }
          />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="AuthCode" component={AuthCode} />
        </Stack.Navigator>
      </AppSettings.Provider>
    </NavigationContainer>
  );
}
