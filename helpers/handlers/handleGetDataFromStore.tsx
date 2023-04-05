import { restoreDataFromStorage } from './AsyncStoreHelpers';

import {
  CompanyAddressData,
  ContactPhonesData,
  EmailAndPasswordData,
  NameAndSurnameData,
  RegisterScreensDataCollection,
  UserRoleMobiScreen,
} from '../../FrontendSelfTypes/RegisterMobi/RegisterScreensData';
import { UserRole } from '../../FarmServiceTypes/User/RegisterNewUserDataDtoInterfaceMobi';

export async function handleGetDataFromStore() {
  const emailAndPassword = await restoreDataFromStorage<EmailAndPasswordData>(
    'RegisterMobiDataEmailAndPassword',
  );
  const nameAndSurname = await restoreDataFromStorage<NameAndSurnameData>(
    'RegisterMobiDataNameSurname',
  );
  const contactPhones = await restoreDataFromStorage<ContactPhonesData>(
    'RegisterMobiDataContactPhones',
  );
  const addresses = await restoreDataFromStorage<CompanyAddressData>(
    'RegisterMobiDataAddresses',
  );
  /* const addressesCdn = await restoreDataFromStorage<CompanyAddressDataCdn>(
    'RegisterMobiDataAddressesCdn',
  ); */
  const userRole = await restoreDataFromStorage<UserRoleMobiScreen>(
    'RegisterMobiUserRole',
  );
  if (
    emailAndPassword &&
    nameAndSurname &&
    contactPhones &&
    addresses &&
    userRole
  ) {
    const data = {
      ...emailAndPassword,
      ...nameAndSurname,
      ...contactPhones,
      ...addresses,
      userRole: userRole.owner ? UserRole.owner : UserRole.worker,
    } as RegisterScreensDataCollection;
    console.log('STORE DEFINED', data);
    return data;
  }
  return undefined;
}
