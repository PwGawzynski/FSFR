import axios, { AxiosInstance } from 'axios';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import {
  EmailAndPasswordData,
  RegisterScreensDataCollection,
} from '../../FrontendSelfTypes/RegisterMobi/RegisterScreensData';
import { RegisterNewUserDataDtoInterfaceMobi } from '../../FarmServiceTypes/User/RegisterNewUserDataDtoInterfaceMobi';
import {
  IdentityAuthTokenLoginRaw,
  IdentityAuthTokenLoginStored,
  LoginUser,
} from '../../FarmServiceTypes/User/LoginUser';
import { ResponseObject } from '../../FarmServiceTypes/Respnse/responseGeneric';
import { checkCurrentSession } from '../handlers/checkIfLogged';

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
      baseURL: 'http://localhost:3002',
      timeout: 5000,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${Api.access_token}`,
      },
    });

    Api.axiosAuthInstance = axios.create({
      baseURL: 'http://localhost:3000',
      timeout: 5000,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${Api.refresh_token}`,
      },
    });
  }

  /**
   * Driver method must be called before any Api usage, checks if tokens are saved and valid,
   * if not return false, then initialize tokens in API, init axios, and restore tokens
   */
  static async init() {
    try {
      if (await checkCurrentSession()) {
        await Api.initTokens();
        await Api.initAxios();
        await Api.restoreTokens();
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  /**
   * Method used to restore tokens from secure store
   * @private
   */
  private static async initTokens() {
    const stored = await SecureStore.getItemAsync('Tokens');
    if (stored) {
      const tokens: IdentityAuthTokenLoginStored = await JSON.parse(stored);
      Api.access_token = tokens.access_token;
      Api.refresh_token = tokens.refresh_token;
    }
    return false;
  }

  /**
   * Method used to refresh tokens
   * @private
   */
  private static async restoreTokens() {
    const response = (await Api.axiosAuthInstance.post('/auth/refresh'))
      .data as ResponseObject<IdentityAuthTokenLoginRaw>;
    await Api.saveTokensToSecureStoreFromResPayload(response);
  }

  /**
   * Method used to save tokens in SecureStore, received in response from Identity
   * @param response ResponseObject<IdentityAuthTokenLoginRaw> data from Identity
   * @private
   */
  private static async saveTokensToSecureStoreFromResPayload(
    response: ResponseObject<IdentityAuthTokenLoginRaw>,
  ) {
    const { payload } = response;
    if (payload) {
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

  static async registerInAuthUser(
    data: EmailAndPasswordData,
  ): Promise<ResponseObject<IdentityAuthTokenLoginRaw>> {
    const axiosInstance = axios.create({
      baseURL: Constants.expoConfig?.extra?.apiUrl,
      timeout: 5000,
      withCredentials: true,
    });
    const response = (
      await axiosInstance.post('/user', {
        login: data.email,
        password: data.password,
      })
    ).data as ResponseObject<IdentityAuthTokenLoginRaw>;
    if (response.payload) {
      Api.access_token = response.payload.access_token;
      Api.refresh_token = response.payload.refresh_token;
      await Api.initAxios();
    }
    console.log(Api.access_token, 'AFTER REGISTER TOKEN');
    return response;
  }

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
        theme: 0,
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
   * @param loginData
   * @returns boolean to indicate that access is given or not
   */
  static async loginUser(loginData: LoginUser) {
    const response: ResponseObject<IdentityAuthTokenLoginRaw> = (
      await Api.axiosAuthInstance.post('/auth/login', loginData)
    ).data;
    // must return true or false to manage isLogged state
    return Api.saveTokensToSecureStoreFromResPayload(response);
  }
}
