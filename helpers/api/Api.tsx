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
import { RestoreTokenStoredObject } from '../../FrontendSelfTypes/IToken/RestoreTokenStoredObject';

export class Api {
  private static axiosAuthInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    withCredentials: true,
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTG9naW4iOiJ1c2VyMjIiLCJ1c2VySWQiOiJiMWU4MmM0Yy1iMzA0LTRlNzMtYTU0ZS05MmY5MTU4MTA1ZWYiLCJpYXQiOjE2Nzk2MDE5ODEsImV4cCI6MTY3OTYwMjg4MX0.8z-XS5wOQO0ExsYpfqP4YaOlmMUaoLIWio-Fw7FMebo`,
    },
  });

  private static axiosInstance = axios.create({
    baseURL: 'http://localhost:3002',
    timeout: 5000,
    withCredentials: true,
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTG9naW4iOiJ1c2VyMjIiLCJ1c2VySWQiOiJiMWU4MmM0Yy1iMzA0LTRlNzMtYTU0ZS05MmY5MTU4MTA1ZWYiLCJpYXQiOjE2Nzk2MDE5ODEsImV4cCI6MTY3OTYwMjg4MX0.8z-XS5wOQO0ExsYpfqP4YaOlmMUaoLIWio-Fw7FMebo`,
    },
  });

  static async checkCurrentSession() {
    const session = await SecureStore.getItemAsync('RefreshToken');
    if (!session) return false;
    const token: RestoreTokenStoredObject = JSON.parse(session);
    const now = new Date();
    return now.getTime() - token.lastUpdatedAt.getTime() > 604800000;
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
      SecureStore.setItemAsync('Tokens', JSON.stringify(storedData));
      return true;
    }
    throw new Error('Something went wrong, try again later');
  }
}
