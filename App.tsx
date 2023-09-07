import 'react-native-gesture-handler';
import React, { useEffect, useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Device from 'expo-device';
import { DeviceType } from 'expo-device';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PaperProvider } from 'react-native-paper';
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
import { GetUserDataResponse } from './FarmServiceTypes/Respnse/UserService/GetUserDataResponse';

export default function App() {
  const [settings, setSettings] = useState(ThemeOptions.light);
  const [deviceType, setDeviceType] = useState(DeviceType.UNKNOWN);
  const [isLogged, setLogged] = useState(false);
  const [userData, setUserData] = useState<GetUserDataResponse | undefined>(
    undefined,
  );
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
        currentUser: userData,
      },
      setters: {
        setTheme: setSettings,
        setDeviceType,
        setLogged,
        setModalContext,
        setCurrentUser: setUserData,
      },
    }),
    [isLogged, settings, deviceType, modalContext, userData],
  );

  useEffect(() => {
    (async () => {
      const recognizedDeviceType = await Device.getDeviceTypeAsync();
      setDeviceType(recognizedDeviceType);
      // to rem after setLogged
      // await Api.init();
      setLogged(await Api.init());
    })();
  }, []);

  const queryClient = new QueryClient();
  return (
    <PaperProvider>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <AppSettings.Provider value={memoSettings}>
            <GlobalModal />
            {!isLogged && <LoginRegisterStack />}
            {isLogged && <Desktop />}
          </AppSettings.Provider>
        </QueryClientProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
