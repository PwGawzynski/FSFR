import { Api } from '../Api';
import { GetUserDataResponse } from '../../../FarmServiceTypes/Respnse/UserService/GetUserDataResponse';

export async function getUserDataService(): Promise<GetUserDataResponse> {
  const data = await Api.getUserData();
  if (!data.data.payload) throw new Error('Cannot access response payload');
  return data.data.payload;
}
