import React, { ReactNode } from 'react';
import {
  TextInput,
  TextInputProps,
  ImageProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { EmailAndPasswordData } from '../../../farm-service-be/types/Useer/RegisterDataObject';
import { LoginStackParamList } from '../NavigatorsInterfaces/LoginStackParamList';
import {
  EmailAndPasswordBase,
  ForgotPasswordBase,
  LoginBase,
  RegisterAskBase,
} from '../navigation/types';

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

export type RegisterFormBase = Omit<
  StackScreenProps<LoginStackParamList>,
  'route'
>;

export interface RegisterFormProps extends RegisterFormBase {
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  isFocused?: boolean;
}

export interface EmailAndPasswordProps extends EmailAndPasswordBase {
  data: EmailAndPasswordData;

  setData: React.Dispatch<React.SetStateAction<EmailAndPasswordData>>;
}
