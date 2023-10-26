import React, { ReactElement, ReactNode } from 'react';
import {
  TextInput,
  TextInputProps,
  ImageProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  GestureResponderEvent,
  StyleProp,
} from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
// eslint-disable-next-line import/extensions
import { MailComposerOptions } from 'expo-mail-composer/src/MailComposer.types';
import {
  ForgotPasswordBase,
  LoginBase,
  OwnerOrdersMaterialRootNavigationProps,
  OwnerOrdersMaterialRootRouteProps,
  RegisterAskBase,
  RegisterTabFormBase,
} from '../navigation/types';
import { UserRole } from '../../FarmServiceTypes/User/RegisterNewUserDataDtoInterfaceMobi';
import { OrdersStackParamList } from '../NavigatorsInterfaces/OrdersStackParamList';
import { OwnerDesktopRootStackParamList } from '../NavigatorsInterfaces/OwnerDesktopRootStackParamList';
import { MaterialOrdersRootTopTabParamList } from '../NavigatorsInterfaces/MaterialOrdersRootTopTabParamLIst';

export interface AppButtonProps {
  action: () => void;
  context: string;
  abs?: string;
  ats?: string;
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

  abs?: string;
  ats?: string;

  keyboardHideOnSubmit?: boolean;

  autoFocus?: boolean;
}

export interface ForgotPasswordProps extends ForgotPasswordBase {
  ats?: string;
  btnStyles?: string;
  abs?: string;
}

export interface InfoTextProps {
  children: ReactNode;
  abs?: string;
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
  abs?: string;
  additionalImageStyles?: string;

  resizeMode?: ImageProps['resizeMode'];
}

export interface LogoImageProps {
  abs?: string;

  resizeMode?: ImageProps['resizeMode'];
}

export interface RegisterAskProps extends RegisterAskBase {
  ats?: string;
  abs?: string;
  additionalBtnStyles?: string;
}

export interface RegisterFormProps extends RegisterTabFormBase {
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  isFocused?: boolean;
}

export interface ScreenTitleHeaderProps {
  abs?: string;
  ats?: string;
  children: ReactNode;

  variant: 'sm' | 'lg';
}

export interface ProfilePhotoProps {
  resizeMode?: ImageProps['resizeMode'];
  abs?: string;

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
  Transport,
}

export enum OrderStatus {
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
  status: OrderStatus;

  pricePerUnit?: number;

  doneArea: number;
}

export type NewOrderI = Omit<
  OrderBaseI,
  'taskId' | 'clientId' | 'area' | 'status' | 'doneArea'
>;

export type OrderProps = OrderBaseI;

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
  keys: Array<string | ReactNode>;
}

export interface FieldListProps {
  checkOn?: true;
  orderId?: string;
  navigation: CompositeNavigationProp<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MaterialTopTabNavigationProp<OrdersStackParamList, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    StackNavigationProp<OwnerDesktopRootStackParamList, any>
  >;
  lPOff?: true;

  shownFieldKeys: Array<{ key: keyof FieldI; alternativeName?: string }>;

  setSelected?: React.Dispatch<React.SetStateAction<Array<string>>>;
}

export interface LineDividerProps {
  abs?: string;
}

export interface ContainerWCenteredLinedTextProps {
  messages?: Array<string> | string;
}

export interface CheckBoxProps<T extends () => void> {
  onPress: T;
}

export enum WorkerPosition {
  Operator,
  Coordinator,
}
export enum WorkerStatus {
  Active,
  Dismissed,
  Suspended,
  OnSickLeave,
  OnHoliday,
}
export interface Worker {
  id: string;
  name: string;
  surname: string;
  photoUrl: string;
  position: WorkerPosition;
  status: WorkerStatus;
  dateOfBirth: string;
  address: string;
  phone: string;
  email: string;
  dateOfEmployment: string;
  province: string;
  county: string;
}

export interface WorkerSelectorProps {
  focusedWorker?: Worker;
  setFocusedWorker: React.Dispatch<React.SetStateAction<Worker | undefined>>;
  data?: Array<Worker> | undefined;
  externalData?: true;
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MaterialTopTabNavigationProp<OrdersStackParamList, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MaterialTopTabNavigationProp<OrdersStackParamList, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface TableProps<T extends Record<string, any>> {
  navigation: CompositeNavigationProp<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MaterialTopTabNavigationProp<OrdersStackParamList, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  abs?: string;
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
  sort?: ((a: OrderBaseI, b: OrderBaseI) => number) | undefined;
  filterMethod?: ((order: OrderBaseI) => boolean) | undefined;
  reloadIndicator?: unknown;
  ListEmptyComponent?: ReactElement;
  abs?: string;
}
export interface SmallHeaderProps {
  children: string;
  abs?: string;
  ats?: string;
}

export interface MagnifierButtonProps {
  onPress?: (event: GestureResponderEvent) => void | undefined;
}

export interface SearchEngineProps {
  value?: string;
  onChangeText?: ((text: string) => void) | undefined;
  /**
   * text value is only updated when search-magnifier click
   */
  onSearchPress?: ((text: string) => void) | undefined;
}

export interface EmptyListProps {
  text: string;
  children?: ReactNode;
}
export interface SubOptionsI {
  value: number | string;
  text: string;
}

export type ActiveFilterValue<T> = {
  main: keyof T;
  subOptions?: Array<SubOptionsI>;
  active?: FilterValue<T>;
};
export type FilterValue<T> = {
  main: keyof T;
  subOption?: string | number;
};
export interface FiltersSetterProps<T> {
  optionsRows: Array<Array<ActiveFilterValue<T>>>;
  onFilterOnOff: (filterName: ActiveFilterValue<T>) => void;
  filterOn: ActiveFilterValue<T>;
}

export interface SubOptionFilterSetterProps<T> {
  options: ActiveFilterValue<T>;
  onFilterOnOff: (filterName: ActiveFilterValue<T>) => void;
  filterOn: ActiveFilterValue<T>;
}

export type SearchModuleInterfaceBasedProps<T> = FiltersSetterProps<T> &
  SearchEngineProps;

export interface OrdersListSearchAndFilterProps<
  T extends keyof MaterialOrdersRootTopTabParamList,
  N extends keyof OrdersStackParamList,
  M extends keyof OwnerDesktopRootStackParamList,
> {
  navigation?: OwnerOrdersMaterialRootNavigationProps<T, N, M>;
  route?: OwnerOrdersMaterialRootRouteProps<T>;
  filterMethod?:
    | ((
        Order: OrderBaseI,
        filter: ActiveFilterValue<OrderBaseI>,
        searchValue: string,
        initSearchValue?: string,
      ) => boolean)
    | undefined;
}

export interface OrderTask {
  id: string;
  type: TaskType;
  worker: Worker;
  field: FieldI;
}

export interface WorkersTaskList {
  data: Array<OrderTask>;
}

export interface WorkerTaskListElement extends OrderTask {
  index: number;
  onRemoveTask: (taskId: string) => void;
}

export interface WorkerComponentI {
  item: Worker;
}

export interface SquaredProfilePictureProps {
  abs?: string;
  additionalImageStyles?: StyleProp<ImageProps>;
  imageLink?: string;
}
export interface CallAndCreateEmailButtonsProps {
  phoneNumber: string;
  emailOptions: MailComposerOptions;
}

export interface WorkerListProps {
  filterMethod?: ((worker: Worker) => boolean) | undefined;
}
