import axios, { AxiosInstance, AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import RNEventSource, { ListenerCallback } from 'react-native-event-source';
import {
  EmailAndPasswordData,
  RegisterScreensDataCollection,
} from '../../FrontendSelfTypes/RegisterMobi/RegisterScreensData';

import {
  IdentityAuthTokenLoginRaw,
  IdentityAuthTokenLoginStored,
  LoginUser,
} from '../../FarmServiceTypes/User/LoginUser';
import { ResponseObject } from '../../FarmServiceTypes/Respnse/responseGeneric';
import { checkCurrentSession } from '../handlers/checkIfLogged';
import { GetUserDataResponse } from '../../FarmServiceTypes/Respnse/UserService/GetUserDataResponse';
import {
  NewClientShortCreateI,
  NewWorker,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { CreateWorkerReqI } from '../../FarmServiceTypes/Worker/Requests';
import { WorkerResponseBase } from '../../FarmServiceTypes/Worker/Responses';
import { Theme } from '../../FarmServiceTypes/Account/Constants';
import { CreateUserReqI } from '../../FarmServiceTypes/User/Requests';
import { OrderResponseBase } from '../../FarmServiceTypes/Order/Ressponses';
import { FieldResponseBase } from '../../FarmServiceTypes/Field/Ressponses';
import { TaskResponseBase } from '../../FarmServiceTypes/Task/Restonses';
import { CreateTaskBase } from '../../FarmServiceTypes/Task/Requests';
import {
  CreateOrderReqI,
  UpdateOrderSetPricePerUnit,
} from '../../FarmServiceTypes/Order/Requests';
import { CreateFieldReqI } from '../../FarmServiceTypes/Field/Requests';

export class Api {
  /**
   * This var is used to store access token and use it in axios instance
   * @private
   */
  private static access_token: string;

  /**
   * This variable is used to store refresh token and use it in axios instance
   * @private
   */
  private static refresh_token: string;

  /**
   * This variable stores axios instance used to connect with BE
   * @private
   */
  private static axiosAuthInstance: AxiosInstance;

  /**
   * This variable is used to store axios instance used to connect with Identity
   * @private
   */
  private static axiosInstance: AxiosInstance;

  /* ----------------------------------------SETTINGS---------------------------------------------*/

  /**
   * Method is  used to initialize axios instance, this instances must be initialized in method to make sure
   * that Token has been restored before initialize
   * @private
   */
  private static async initAxios() {
    Api.axiosInstance = axios.create({
      baseURL: `http://${Constants.expoConfig?.extra?.apiUrl}:3002`,
      timeout: 5000,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${Api.access_token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    Api.axiosAuthInstance = axios.create({
      baseURL: `http://${Constants.expoConfig?.extra?.apiUrl}:3000`,
      timeout: 5000,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${Api.refresh_token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  /**
   * Driver to init Api instance, init tokens, init axios, restore sessions Tokens
   * @return TRUE if session has been correctly restored, FALSE if session expired and can't be restored
   */
  static async init() {
    try {
      await Api.initTokens();
      await Api.initAxios();
      return (await checkCurrentSession()) || (await Api.restoreTokens());
    } catch (e) {
      await Api.initAxios();
      return false;
    }
  }

  /**
   * Method used to restore tokens from secure store
   * @throws Error when can't get tokens from store
   */
  private static async initTokens(): Promise<void> {
    const stored = await SecureStore.getItemAsync('Tokens');
    if (!stored) throw Error('Cannot get tokens');
    const tokens: IdentityAuthTokenLoginStored = await JSON.parse(stored);
    Api.access_token = tokens.access_token;
    Api.refresh_token = tokens.refresh_token;
  }

  static async getUserData(): Promise<
    AxiosResponse<ResponseObject<GetUserDataResponse>>
  > {
    return Api.axiosInstance.get('/user/me');
  }

  /**
   * Refresh tokens stored in SecureStore
   * @private
   * @return True if refresh went correct
   * @throws AxiosError when req went wrong, Error when saving operation went wrong
   */
  private static async restoreTokens() {
    const response = (await Api.axiosAuthInstance.post('/auth/refresh'))
      .data as ResponseObject<IdentityAuthTokenLoginRaw>;
    return Api.saveTokensToSecureStoreFromResPayload(response);
  }

  /**
   * Method used to save tokens in SecureStore, received in response from Identity
   * @param response ResponseObject<IdentityAuthTokenLoginRaw> data from Identity
   * @return true if tokens have been correctly saved
   * @throws Error when save or axios init went wrong
   */
  private static async saveTokensToSecureStoreFromResPayload(
    response: ResponseObject<IdentityAuthTokenLoginRaw>,
  ): Promise<boolean> {
    const { payload } = response;
    if (payload?.access_token && payload.access_token) {
      const storedData: IdentityAuthTokenLoginStored = {
        ...payload,
        last_updated_access_token_at: new Date(),
        last_updated_refresh_token_at: new Date(),
      };
      // updating tokens connected with Api instance
      Api.access_token = storedData.access_token;
      Api.refresh_token = storedData.refresh_token;
      await SecureStore.setItemAsync(
        'Tokens',
        await JSON.stringify(storedData),
      );
      // because after login token has been updated, but in axios instances still, those are old tokens, so we need to update axios instances
      await Api.initAxios();
      return true;
    }
    throw new Error('cannot access data payload from response');
  }

  /* ----------------------------------------API-CALS---------------------------------------------*/

  /**
   * Register new user in Auth system,
   * @param data : EmailAndPasswordData
   * @returns TRUE if register and save Tokens From register in SecureStore went correct
   * @throws AxiosError when error on request occur, or Error when Save went wrong
   */
  static async registerInAuthUser(
    data: EmailAndPasswordData,
  ): Promise<boolean> {
    await Api.initAxios();
    const response = (
      await Api.axiosAuthInstance.post('/user', {
        login: data.email,
        password: data.password,
      })
    ).data as ResponseObject<IdentityAuthTokenLoginRaw>;
    await Api.saveTokensToSecureStoreFromResPayload(response);
    return true;
  }

  /**
   * Register new user in Api
   * @param userData : RegisterScreensDataCollection
   * @returns ResponseObject when operation went correct
   * @throws AxiosError return by axios
   */
  static async registerNewUser(userData: RegisterScreensDataCollection) {
    const serializedData = {
      email: userData.email,
      userPersonalData: {
        name: userData.name,
        surname: userData.surname,
        phoneNumber: userData.contactPhone,
      },
      addressData: {
        city: userData.city,
        county: userData.county,
        street: userData.street,
        apartmentNumber: userData.apartmentNumber,
        voivodeship: userData.voivodeship,
        houseNumber: userData.houseNumber,
        postalCode: userData.postalCode,
      },
      accountData: {
        theme: Theme.light,
      },
      userRole: userData.userRole,
    } as CreateUserReqI;
    return Api.axiosInstance.post('/user', serializedData, {
      headers: {
        Authorization: `Bearer ${Api.access_token}`,
      },
    });
  }

  /**
   * Method used when user login ion app
   * @param loginData : LoginUser
   * @returns boolean to indicate that access is given or not
   * @throws Error when save went wrong
   */
  static async loginUser(loginData: LoginUser) {
    const response: ResponseObject<IdentityAuthTokenLoginRaw> = (
      await Api.axiosAuthInstance.post('/auth/login', loginData)
    ).data;
    // must return true or false to manage isLogged state
    return Api.saveTokensToSecureStoreFromResPayload(response);
  }

  /**
   * Method used to check if userLogin is free to take
   * @param userLoginIdentifier
   * @throws AxiosError return by axios
   */
  static async checkIfExist(userLoginIdentifier: string) {
    return (
      await Api.axiosAuthInstance.get(`/user/exist/${userLoginIdentifier}`)
    ).data;
  }

  static async getAllActivities() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const data = require('../../tmpData');
    return new Promise(r => {
      setTimeout(() => r(data), 2000);
    });
  }

  static async getAllEvents() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('../../tmpData');
  }

  static async getAllOrders() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return Api.axiosInstance.get('order/all') as Promise<
      AxiosResponse<Array<OrderResponseBase>>
    >;
  }

  static async getDataFromXLM(data: string) {
    return Api.axiosInstance.post('field/xmlTranslate', { data });
  }

  static async createField(data: CreateFieldReqI) {
    return Api.axiosInstance.post('field', data);
  }

  static async getWorkers() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return Api.axiosInstance.get('/company/workers') as Promise<
      AxiosResponse<Array<WorkerResponseBase>>
    >;
  }

  static async getAllFieldsByOrderId(
    id: string,
  ): Promise<AxiosResponse<ResponseObject<Array<FieldResponseBase>>>> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return Api.axiosInstance.get('field/all-for-order', { params: { id } });
  }

  static async getAllFieldsById(id: string) {
    return Api.axiosInstance.get('field', { params: { id } }) as Promise<
      AxiosResponse<ResponseObject<FieldResponseBase>>
    >;
  }

  static async remField(id: string) {
    return Api.axiosInstance.delete('field', { params: { id } }) as Promise<
      AxiosResponse<ResponseObject>
    >;
  }

  static async addNewOrder(data: CreateOrderReqI) {
    return Api.axiosInstance.post('order', data) as Promise<
      AxiosResponse<ResponseObject>
    >;
  }

  static async addNewWorker(data: NewWorker): Promise<boolean> {
    // eslint-disable-next-line no-console
    console.log('NEW ORDER DATA: ', data);
    const respose = new Promise(resolve => {
      setTimeout(() => resolve(true), 3000);
    });
    return respose as Promise<boolean>;
  }

  static async orderFinishAndAccount(data: UpdateOrderSetPricePerUnit) {
    return Api.axiosInstance.put('order', data);
  }

  static async addNewTasks(data: Array<CreateTaskBase>) {
    // eslint-disable-next-line no-console
    return Api.axiosInstance.post('/task', { tasks: data }) as Promise<
      AxiosResponse<ResponseObject>
    >;
  }

  static async createNewClientShort(data: NewClientShortCreateI) {
    // eslint-disable-next-line no-console
    console.log('NEW CLIENT', data);
    return true;
  }

  static async sendConfirmationAsk(data: string) {
    // eslint-disable-next-line no-console
    console.log('CONFIRMATION ASK FOR ORDER_ID', data);
    return true;
  }

  static async getAllOrdersTasks(orderId: string) {
    return Api.axiosInstance.get('/task/by-order/', {
      params: { id: orderId },
    }) as Promise<AxiosResponse<Array<TaskResponseBase>>>;
  }

  static async remTaskListElement(TaskId: string): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,no-promise-executor-return
    return Api.axiosInstance.delete('task', { data: { task: TaskId } });
  }

  static async getWorker() {
    return (await Api.axiosInstance.get(`/worker/id`)).data.payload;
  }

  static async getTasks(): Promise<TaskResponseBase[]> {
    return (await Api.axiosInstance.get(`/task/worker`)).data.payload;
  }

  static async openTask(id: string): Promise<ResponseObject> {
    return (
      await Api.axiosInstance.post(`/task/open`, undefined, { params: { id } })
    ).data.payload;
  }

  static async closeTask(id: string): Promise<ResponseObject> {
    return (
      await Api.axiosInstance.post(`/task/close`, undefined, { params: { id } })
    ).data.payload;
  }

  static async createWorker(data: CreateWorkerReqI) {
    return (await Api.axiosInstance.post(`/worker`, data)).data
      .payload as WorkerResponseBase;
  }

  static workerAssignedListener(
    workerId: string,
    { open, message, error }: workerAsyncListenerParams,
  ) {
    const eventSource = new RNEventSource(
      `http://localhost:3002/worker/sse/${workerId}`,
      { headers: { Authorization: `Bearer ${Api.access_token}` } },
    );

    eventSource.addEventListener('message', data => {
      message(data);
      eventSource.removeAllListeners();
      eventSource.close();
    });
    eventSource.addEventListener('error', data => {
      error(data);
      eventSource.removeAllListeners();
      eventSource.close();
    });
    eventSource.addEventListener('open', open);
  }
}

export interface workerAsyncListenerParams {
  open: ListenerCallback;
  message: ListenerCallback;
  error: ListenerCallback;
}
