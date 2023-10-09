import React, { ReactNode } from 'react';
import {
  TextInput,
  TextInputProps,
  ImageProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import {
  MaterialTopTabNavigationProp,
  MaterialTopTabScreenProps,
} from '@react-navigation/material-top-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  ForgotPasswordBase,
  LoginBase,
  RegisterAskBase,
  RegisterTabFormBase,
} from '../navigation/types';
import { UserRole } from '../../FarmServiceTypes/User/RegisterNewUserDataDtoInterfaceMobi';
import { OrdersTopTabParamList } from '../NavigatorsInterfaces/OrdersTopTabParamList';
import { OwnerDesktopRootStackParamList } from '../NavigatorsInterfaces/OwnerDesktopRootStackParamList';

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
  additionalStyles?: string;
  additionalTextStyles?: string;
  children: ReactNode;

  variant: 'sm' | 'lg';
}

export interface ProfilePhotoProps {
  resizeMode?: ImageProps['resizeMode'];
  additionalBoxStyles?: string;

  additionalImageStyles?: string;

  imgLink?: string;
  focused?: boolean;
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

export enum TaskType {
  Harvesting,
}

export enum OrderStats {
  Added,
  Confirmed,
  Done,
}

export interface OrderBaseI {
  taskId: string;
  name: string;
  type: TaskType;
  additionalInfo: string;
  performanceDate: string;
  clientId: string;
  client: string;

  area: number;
  status: OrderStats;

  pricePerUnit?: number;

  doneArea: number;
}

export type NewOrderI = Omit<
  OrderBaseI,
  'taskId' | 'clientId' | 'area' | 'status' | 'doneArea'
>;

export interface OrderProps extends OrderBaseI {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<OrdersTopTabParamList, any>,
    StackNavigationProp<OwnerDesktopRootStackParamList, any>
  >;
}

export interface NewClientShortCreateI {
  name: string;
  phoneNumber: string;
  email: string;
}

export interface AddOrderFormProps {
  newOrder: NewOrderI;
  setNewOrder: React.Dispatch<React.SetStateAction<NewOrderI>>;
}

export interface AddClientShortFormProps {
  newClient: NewClientShortCreateI;
  setNewClient: React.Dispatch<React.SetStateAction<NewClientShortCreateI>>;
}
type AddOrderAndClientPropsUnion = AddOrderFormProps & AddClientShortFormProps;
export interface AddOrderAndClientFormProps
  extends AddOrderAndClientPropsUnion {
  setCanValidateClient: React.Dispatch<React.SetStateAction<boolean>>;
  setCanValidate: React.Dispatch<React.SetStateAction<boolean>>;
  setBtnClicked: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface AddOrderErrorInfoProps {
  isNewOrderError: boolean;
  newOrderErrorValue: unknown;
  btnClicked: boolean;
  clientValidator: { isError: boolean; errorMessages: string[] };
  validator: { isError: boolean; errorMessages: string[] };
}

export enum FieldStatus {
  WAITING,
  OPEN,
  DONE,
}
export interface FieldI {
  taskId: string;
  fieldId: string;
  area: number;
  status: FieldStatus;
  voice: string;
  county: string;
  city: string;
  dataCollectionDate: string;
  name: string;
}

export interface OrderAccountingField extends FieldI {
  price: number;
  priceWTax: number;
}
export interface AccountingFieldFlatListItem {
  item: OrderAccountingField;
}
export interface OrderListItemI {
  item: OrderBaseI;
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<OrdersTopTabParamList, any>,
    StackNavigationProp<OwnerDesktopRootStackParamList, any>
  >;
}
export interface OrderListRenderItem {
  item: OrderBaseI;
}
export interface OrderAccountingFieldListProps {
  fields: Array<OrderAccountingField>;
}

export interface OrderAccountingFieldListItemProps {
  item: OrderAccountingField;
}
export interface OrderDetailsHeaderProps {
  onButtonClick: () => void;
  headerText: string;
  buttonText: string;

  variant: 'sm' | 'lg';

  buttonAdditionalStyles?: string;

  headerAdditionalStyles?: string;

  boxAdditionalStyles?: string;

  buttonTextAdditionalStyles?: string;
}

export interface OrderDetailsInfoProps {
  titles: Array<string>;
  keys: Array<string>;
}

export interface FieldListProps {
  checkOn?: true;
  orderId?: string;
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<OrdersTopTabParamList, any>,
    StackNavigationProp<OwnerDesktopRootStackParamList, any>
  >;
  lPOff?: true;

  shownFieldKeys: Array<{ key: keyof FieldI; alternativeName?: string }>;

  setSelected?: React.Dispatch<React.SetStateAction<Array<string>>>;
}

export interface LineDividerProps {
  additionalStyles?: string;
}

export interface ContainerWCenteredLinedTextProps {
  messages?: Array<string> | string;
}

export interface CheckBoxProps<T extends () => void> {
  onPress: T;
}

export interface Worker {
  id: string;
  name: string;
  surname: string;
  photoUrl: string;
}

export interface WorkerSelectorProps {
  focusedWorker?: Worker;
  setFocusedWorker: React.Dispatch<React.SetStateAction<Worker | undefined>>;
}

export interface NewTaskI {
  fieldId: string;
  workerId: string;
  type: TaskType;
}

export interface SelectWorkerPanelProps {
  fieldsIds: Array<string>;
  validationError: boolean;
  setValidationError: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<OrdersTopTabParamList, any>,
    StackNavigationProp<OwnerDesktopRootStackParamList, any>
  >;
}

export interface AddNewTasksI {
  fieldsIds: Array<string>;
  workerId: string;
  type: TaskType;
}

export interface FieldTableRowProps {
  fields: Array<FieldI> | undefined;
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<OrdersTopTabParamList, any>,
    StackNavigationProp<OwnerDesktopRootStackParamList, any>
  >;
  lPOff?: true;
  columnNames: Array<{ key: keyof FieldI; alternativeName?: string }>;
  checkOn?: true;
  setSelected?: React.Dispatch<React.SetStateAction<Array<string>>>;
}
export interface FieldTableHeadersProps {
  checkOn?: true;
  lPOff?: true;
  columnNames: Array<{ key: keyof FieldI; alternativeName?: string }>;
}

export interface TableSettings<T> {
  field: keyof T;
  header: string;
  colWidth?: string;
}

export interface TableProps<T extends Record<string, any>> {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<OrdersTopTabParamList, any>,
    StackNavigationProp<OwnerDesktopRootStackParamList, any>
  >;
  columns: Array<TableSettings<T>>;
  rows: Array<T>;
  checkBoxSelection?: true;
  onSelect?: (rowElement: T) => void;
  LP?: true;
}

export interface AccountingPdfContentI {
  header: string;
  headerFooter: string;
  documentBottomFooter: string;
  priceSum: string;
  priceWTaxSum: string;
}

export interface NumericInputProps {
  value: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  onBlur?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  additionalBoxStyles?: string;
}

export type OrderAccountingPrintColumnsSettings = Array<
  TableSettings<OrderAccountingField>
>;

export interface AccountingSummaryAndPrintProps {
  fields: Array<OrderAccountingField>;
  columnsSettings: OrderAccountingPrintColumnsSettings;
}

export interface PriceSetterProps {
  price: string;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  setReRender?: React.Dispatch<React.SetStateAction<boolean>>;
  onCalculatePress?: () => void;
  onSavePress?: () => void;
  calculateOption?: true;
  onBlur?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
}

export interface OrdersListProps {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<OrdersTopTabParamList, 'ordersRoot'>,
    StackNavigationProp<OwnerDesktopRootStackParamList, 'orders'>
  >;
  route: MaterialTopTabScreenProps<
    OrdersTopTabParamList,
    'ordersRoot'
  >['route'];
  sort?: ((a: OrderBaseI, b: OrderBaseI) => number) | undefined;
}
export interface SmallHeaderProps {
  children: string;
  additionalBoxStyles?: string;
  additionalTextStyles?: string;
}
