import axios, { AxiosInstance, AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import {
  EmailAndPasswordData,
  RegisterScreensDataCollection,
} from '../../FrontendSelfTypes/RegisterMobi/RegisterScreensData';
import {
  RegisterNewUserDataDtoInterfaceMobi,
  Theme,
} from '../../FarmServiceTypes/User/RegisterNewUserDataDtoInterfaceMobi';
import {
  IdentityAuthTokenLoginRaw,
  IdentityAuthTokenLoginStored,
  LoginUser,
} from '../../FarmServiceTypes/User/LoginUser';
import { ResponseObject } from '../../FarmServiceTypes/Respnse/responseGeneric';
import { checkCurrentSession } from '../handlers/checkIfLogged';
import { GetUserDataResponse } from '../../FarmServiceTypes/Respnse/UserService/GetUserDataResponse';
import {
  AddNewTasksI,
  FieldI,
  NewClientShortCreateI,
  NewOrderI,
  OrderBaseI,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export class Api {
  /**
   * This var is used to store access token and use it in axios instance
   * @private
   */
  private static access_token: string;

  /**
   * This varialble is used to store refresh token and use it in axios instance
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
    } as RegisterNewUserDataDtoInterfaceMobi;
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
    return data;
  }

  static async getAllEvents() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const data = require('../../tmpData');
    return data;
  }

  static async getAllOrders() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const data = require('../../tmpData');
    return new Promise(resolve => {
      setTimeout(() => resolve(data), 6000);
    });
  }

  static async getWorkers() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const data = require('../../tmpData');
    return data;
  }

  static async getAllFieldsByOrderId(id: string): Promise<Array<FieldI>> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const data = require('../../tmpData');
    // TEMPORARY
    return data.fields.filter((f: any) => f.taskId === id) as Array<FieldI>;
  }

  static async getAllFieldsById(id: string): Promise<FieldI> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const data = require('../../tmpData');
    // TEMPORARY
    return data.fields.find((f: any) => f.fieldId === id) as FieldI;
  }

  static async addNewOrder(data: NewOrderI) {
    console.log('NEW ORDER DATA: ', data);
    return true;
  }

  static async orderFinishAndAccount(data: OrderBaseI) {
    console.log('ORDER UPDATE SET_PRICE_PER_UNIT', data);
    return true;
  }

  static async addNewTasks(data: AddNewTasksI) {
    console.log('NEW TASKS DATA: ', data);
    return true;
  }

  static async createNewClientShort(data: NewClientShortCreateI) {
    console.log('NEW CLIENT', data);
    return true;
  }

  static async sendConfirmationAsk(data: string) {
    console.log('CONFIRMATION ASK FOR ORDER_ID', data);
    return true;
  }
}
