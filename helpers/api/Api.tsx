import axios from 'axios';
import { RegisterScreensDataCollection } from '../../FrontendSelfTypes/RegisterMobi/RegisterScreensData';
import { RegisterNewUserDataDtoInterfaceMobi } from '../../FarmServiceTypes/User/RegisterNewUserDataDtoInterfaceMobi';

export class Api {
  private static axiosInstance = axios.create({
    baseURL: 'http://localhost:3002',
    timeout: 5000,
    withCredentials: true,
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTG9naW4iOiJ1c2VyMjIiLCJ1c2VySWQiOiJiMWU4MmM0Yy1iMzA0LTRlNzMtYTU0ZS05MmY5MTU4MTA1ZWYiLCJpYXQiOjE2Nzk1OTc1MzksImV4cCI6MTY3OTU5ODQzOX0.8CboaDrGzg0LooecL9M9Q0T1jpWpVFjVqjK-V64DvQk`,
    },
  });

  static async registerNewUser(userData: RegisterScreensDataCollection) {
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
      return Api.axiosInstance
        .post('/user', serializedData)
        .then(res => console.log(res.data))
        .catch(e => e);
    } catch (e) {
      return '';
    }
  }
}
