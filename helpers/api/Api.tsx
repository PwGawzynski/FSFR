import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { RegisterScreensDataCollection } from '../../FrontendSelfTypes/RegisterMobi/RegisterScreensData';
import { RegisterNewUserDataDtoInterfaceMobi } from '../../FarmServiceTypes/User/RegisterNewUserDataDtoInterfaceMobi';
import {
  IdentityAuthTokenLoginRaw,
  IdentityAuthTokenLoginStored,
  LoginUser,
} from '../../FarmServiceTypes/User/LoginUser';
import { ResponseObject } from '../../FarmServiceTypes/Respnse/responseGeneric';

export class Api {
  private static access_token: string;

  private static refresh_token: string;

  private static axiosAuthInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${Api.refresh_token}`,
    },
  });

  private static axiosInstance = axios.create({
    baseURL: 'http://localhost:3002',
    timeout: 5000,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${Api.access_token}`,
    },
  });

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
    return Api.axiosInstance.post('/user', serializedData);
  }

  static async loginUser(loginData: LoginUser) {
    const response: ResponseObject<IdentityAuthTokenLoginRaw> = (
      await Api.axiosAuthInstance.post('/auth/login', loginData)
    ).data;
    const { payload } = response;
    if (payload) {
      const storedData: IdentityAuthTokenLoginStored = {
        ...payload,
        last_updated_access_token_at: new Date(),
        last_updated_refresh_token_at: new Date(),
      };
      SecureStore.setItemAsync('Tokens', await JSON.stringify(storedData));
      return true;
    }
    throw new Error('Something went wrong, try again later');
  }
}
