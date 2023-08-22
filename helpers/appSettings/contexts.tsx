import React from 'react';
import { DeviceType } from 'expo-device';
import { GetUserDataResponse } from '../../FarmServiceTypes/Respnse/UserService/GetUserDataResponse';
// _______________________APP_SETTINGS_______________________ //
export enum ThemeOptions {
  dark,
  light,
}

export enum ModalState {
  on,
  off,
}

export interface ModalContext {
  isOn: ModalState;
  context?: string;

  customApproveButtonText?: string;
  customDisapproveButtonText?: string;

  onApproveCallback?: () => void;
  onDisapproveCallback?: () => void;
}

interface SettingsObject {
  theme: ThemeOptions;
  deviceType: DeviceType;

  isLogged: boolean;

  modalContext: ModalContext;

  currentUser: GetUserDataResponse | undefined;
}
interface AppOptionsSetters {
  setTheme: React.Dispatch<React.SetStateAction<ThemeOptions>>;
  setCurrentUser: React.Dispatch<
    React.SetStateAction<GetUserDataResponse | undefined>
  >;
  setDeviceType: React.Dispatch<React.SetStateAction<DeviceType>>;
  setLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setModalContext: React.Dispatch<React.SetStateAction<ModalContext>>;
}
interface SettingsContext {
  settings: SettingsObject;
  setters: AppOptionsSetters;
}
export const AppSettings = React.createContext({} as SettingsContext);
// _______________________END_APP_SETTINGS_______________________ //
