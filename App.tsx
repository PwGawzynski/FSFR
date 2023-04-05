import 'react-native-gesture-handler';
import React, { useEffect, useMemo, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as Device from 'expo-device';
import { DeviceType } from 'expo-device';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppSettings, ThemeOptions } from './helpers/appSettings/contexts';
import { ResetPassword } from './Components/Pages/ResetPassword';
import { AuthCode } from './Components/Pages/AuthCode';
import { LoginPage } from './Components/Pages/LoginPage';
import { LoginPageTab } from './Components/Pages/LoginPageTab';
import { RegisterTab } from './Components/Pages/RegisterTab';
import { RegisterMobi } from './Components/Pages/RegisterMobi';
import { LoginStackParamList } from './frontendSelfTypes/NavigatorsInterfaces/LoginStackParamList';
import { Test } from './Components/Pages/test';
import { Api } from './helpers/api/Api';

export default function App() {
  const [settings, setSettings] = useState(ThemeOptions.light);
  const [deviceType, setDeviceType] = useState(DeviceType.UNKNOWN);
  const [isLogged, setLogged] = useState(false);

  const memoSettings = useMemo(
    () => ({
      settings: {
        theme: settings,
        deviceType,
        isLogged,
      },
      setters: {
        setTheme: setSettings,
        setDeviceType,
        setLogged,
      },
    }),
    [isLogged, settings, deviceType],
  );
  useEffect(() => {
    (async () => {
      const recognizedDeviceType = await Device.getDeviceTypeAsync();
      setDeviceType(recognizedDeviceType);
      await Api.init();
      // setLogged(await Api.init());
    })();
  }, []);

  const Stack = createStackNavigator<LoginStackParamList>();

  const queryClient = new QueryClient();
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <AppSettings.Provider value={memoSettings}>
          {!isLogged && (
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
          )}
          {isLogged && <Test />}
        </AppSettings.Provider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}
