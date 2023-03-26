import React from 'react';
import { DeviceType } from 'expo-device';
// _______________________APP_SETTINGS_______________________ //
export enum ThemeOptions {
  dark,
  light,
}
interface SettingsObject {
  theme: ThemeOptions;
  deviceType: DeviceType;

  isLogged: boolean;
}
interface AppOptionsSetters {
  setTheme: React.Dispatch<React.SetStateAction<ThemeOptions>>;
  setDeviceType: React.Dispatch<React.SetStateAction<DeviceType>>;
  setLogged: React.Dispatch<React.SetStateAction<boolean>>;
}
interface SettingsContext {
  settings: SettingsObject;
  setters: AppOptionsSetters;
}
export const AppSettings = React.createContext({} as SettingsContext);
// _______________________END_APP_SETTINGS_______________________ //
