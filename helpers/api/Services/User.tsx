import { Api } from '../Api';
import { GetUserDataResponse } from '../../../FarmServiceTypes/Respnse/UserService/GetUserDataResponse';
import { AddressResponseBase } from '../../../FarmServiceTypes/Address/Ressponses';

export async function getUserDataService(): Promise<GetUserDataResponse> {
  const data = await Api.getUserData();
  if (!data.data.payload) throw new Error('Cannot access response payload');
  return data.data.payload;
}

export async function me() {
  return (await Api.me()).payload;
}

export async function myAddress(): Promise<AddressResponseBase | undefined> {
  return (await Api.myAddress()).payload;
}
