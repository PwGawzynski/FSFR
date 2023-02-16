import React from 'react';
// _______________________APP_SETTINGS_______________________ //
export enum ThemeOptions {
  dark,
  light,
}
interface SettingsObject {
  theme: ThemeOptions;
}
interface AppOptionsSetters {
  setTheme: React.Dispatch<React.SetStateAction<ThemeOptions>>;
}
interface SettingsContext {
  settings: SettingsObject;
  setters: AppOptionsSetters;
}
export const AppSettings = React.createContext({} as SettingsContext);
// _______________________END_APP_SETTINGS_______________________ //
