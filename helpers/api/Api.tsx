import axios from 'axios';
import { RegisterDataMobi } from '../../types/Useer/RegisterDataObject';

export class Api {
  private static axiosInstance = axios.create({
    baseURL: 'http://localhost:3002',
    timeout: 5000,
    withCredentials: true,
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTG9naW4iOiJ1c2VyMjIiLCJ1c2VySWQiOiJiMWU4MmM0Yy1iMzA0LTRlNzMtYTU0ZS05MmY5MTU4MTA1ZWYiLCJpYXQiOjE2Nzk0MjM3NzYsImV4cCI6MTY3OTQyNDY3Nn0.BIN2Q4th_MGnCuSQfFMW6hcszpSAwactUebrCINfjkU`,
    },
  });

  static async registerNewUser(userData: RegisterDataMobi) {
    try {
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
          street: userData.city,
          houseNumber: userData.houseNumber,
          postalCode: userData.postalCode,
        },
        accountData: {
          theme: 0,
        },
      };
      return Api.axiosInstance
        .post('/user', serializedData)
        .then(res => console.log(res.data))
        .catch(e => e);
    } catch (e) {
      return '';
    }
  }
}
