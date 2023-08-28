import React, { ReactNode } from 'react';
import {
  TextInput,
  TextInputProps,
  ImageProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import {
  ForgotPasswordBase,
  LoginBase,
  RegisterAskBase,
  RegisterTabFormBase,
} from '../navigation/types';
import { UserRole } from '../../FarmServiceTypes/User/RegisterNewUserDataDtoInterfaceMobi';

export interface AppButtonProps {
  action: () => void;
  context: string;
  additionalStyles?: string;
  additionalTextStyles?: string;
}

export interface AppInputProps<T extends object> {
  setter: React.Dispatch<React.SetStateAction<T>>;
  autoComplete?: TextInputProps['autoComplete'];
  underlyingLabel?: string;

  keyboardType?: TextInputProps['keyboardType'];
  ObjectKey: keyof T;
  value: string;
  onChange?: (value: string) => void;
  inputMode?:
    | 'addressCity'
    | 'countryName'
    | 'creditCardNumber'
    | 'emailAddress'
    | 'fullStreetAddress'
    | 'givenName'
    | 'name'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'username'
    | 'password'
    | 'newPassword'
    | 'oneTimeCode';

  isPwd?: boolean;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onDeFocus?: () => void;

  refGetter?: React.MutableRefObject<TextInput | null>;

  onSubmit?: () => void;

  maxLength?: number;

  additionalStyles?: string;
  additionalTextStyles?: string;

  keyboardHideOnSubmit?: boolean;

  autoFocus?: boolean;
}

export interface ForgotPasswordProps extends ForgotPasswordBase {
  additionalTxtStyles?: string;
  additionalBtnStyles?: string;
  additionalStyles?: string;
}

export interface InfoTextProps {
  children: ReactNode;
  additionalStyles?: string;
}

export interface InputLabelProps {
  children: ReactNode;
}

export interface LoginFormProps {
  onFocus?: () => void;
  onDeFocus?: () => void;
}

export interface LoginProps extends LoginBase {
  onOff: boolean;
  setOnOff: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface LogoImageAnimatedProps {
  onOff: boolean;
}
export interface LogoProps {
  additionalBoxStyles?: string;
  additionalImageStyles?: string;

  resizeMode?: ImageProps['resizeMode'];
}

export interface LogoImageProps {
  additionalBoxStyles?: string;

  resizeMode?: ImageProps['resizeMode'];
}

export interface RegisterAskProps extends RegisterAskBase {
  additionalTxtStyles?: string;
  additionalStyles?: string;
  additionalBtnStyles?: string;
}

export interface RegisterFormProps extends RegisterTabFormBase {
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  isFocused?: boolean;
}

export interface ScreenTitleHeaderProps {
  children: ReactNode;

  variant: 'sm' | 'lg';
}

export interface ProfilePhotoProps {
  resizeMode?: ImageProps['resizeMode'];
  additionalBoxStyles?: string;

  additionalImageStyles?: string;

  imgLink?: string;
}
// TODO move to united types
export interface ActivityProps {
  activityLogCauser: string;
  activityCauserRole: number;
  activityType: number;
  taskType: string;
  client: string;
  fieldName: string;
  fieldLocationPlaceName: string;
  // TODO change to date
  date: string;
}

export type ActivityI = ActivityProps;

// TODO move to united types
export enum EventType {
  Action,
  Warning,
  Check,
}
// TODO move to united types
export interface NotificationI {
  causer: string;
  causerRole: UserRole;
  message: string;
  rightBottomSign: string;

  eventType: EventType;
}

export type NotificationProps = NotificationI;

export interface NotificationsProps {
  filterOptions: ThreeOptionSwitchStates;
}
export interface ThreeOptionSwitchStates {
  firstOptionName: string;
  firstOptionState: boolean;
  secondOptionName: string;
  secondOptionState: boolean;
  thirdOptionName: string;
  thirdOptionState: boolean;
}
export interface ThreeOptionSwitchProps {
  options: ThreeOptionSwitchStates;

  setter: React.Dispatch<React.SetStateAction<ThreeOptionSwitchStates>>;
}
