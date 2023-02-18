import 'react-native-gesture-handler';
import React, { useMemo, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AppSettings, ThemeOptions } from './helpers/appSettings/contexts';
import { LoginPage } from './Components/Pages/LoginPage';
import { Register } from './Components/Pages/Register';
import { ResetPassword } from './Components/Pages/ResetPassword';
import { AuthCode } from './Components/Pages/AuthCode';

export type LoginStackParamList = {
  Login: undefined;
  Register: undefined;
  AuthCode: undefined;
  ResetPassword: undefined;
};

export default function App() {
  const [settings, setSettings] = useState(ThemeOptions.light);
  const memoSettings = useMemo(
    () => ({
      settings: {
        theme: settings,
      },
      setters: {
        setTheme: setSettings,
      },
    }),
    [settings],
  );

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
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="AuthCode" component={AuthCode} />
        </Stack.Navigator>
      </AppSettings.Provider>
    </NavigationContainer>
  );
}
