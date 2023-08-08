import 'react-native-gesture-handler';
import React, { useEffect, useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Device from 'expo-device';
import { DeviceType } from 'expo-device';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  AppSettings,
  ModalContext,
  ModalState,
  ThemeOptions,
} from './helpers/appSettings/contexts';

import { Api } from './helpers/api/Api';
import { GlobalModal } from './Components/Atoms/GlobalModal';
import { LoginRegisterStack } from './Components/Navigators/LoginRegisterStack';
import { Desktop } from './Components/Pages/Desktop';

export default function App() {
  const [settings, setSettings] = useState(ThemeOptions.light);
  const [deviceType, setDeviceType] = useState(DeviceType.UNKNOWN);
  const [isLogged, setLogged] = useState(false);
  const [modalContext, setModalContext] = useState<ModalContext>({
    isOn: ModalState.off,
  });

  const memoSettings = useMemo(
    () => ({
      settings: {
        theme: settings,
        deviceType,
        isLogged,
        modalContext,
      },
      setters: {
        setTheme: setSettings,
        setDeviceType,
        setLogged,
        setModalContext,
      },
    }),
    [isLogged, settings, deviceType, modalContext],
  );
  useEffect(() => {
    (async () => {
      const recognizedDeviceType = await Device.getDeviceTypeAsync();
      setDeviceType(recognizedDeviceType);
      await Api.init();
      // setLogged(await Api.init());
    })();
  }, []);

  const queryClient = new QueryClient();
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <AppSettings.Provider value={memoSettings}>
          <GlobalModal />
          {!isLogged && <LoginRegisterStack />}
          {isLogged && <Desktop />}
        </AppSettings.Provider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}
