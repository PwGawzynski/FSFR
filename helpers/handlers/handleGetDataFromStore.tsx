import { restoreDataFromStorage } from './AsyncStoreHelpers';
import {
  CompanyAddressData,
  ContactPhonesData,
  EmailAndPasswordData,
  NameAndSurnameData,
  RegisterDataMobi,
} from '../../types/Useer/RegisterDataObject';

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
  const addressesCdn = await restoreDataFromStorage<CompanyAddressData>(
    'RegisterMobiDataAddressesCdn',
  );
  if (
    emailAndPassword &&
    nameAndSurname &&
    contactPhones &&
    addresses &&
    addressesCdn
  ) {
    const data = {
      ...addressesCdn,
      ...emailAndPassword,
      ...nameAndSurname,
      ...contactPhones,
      ...addresses,
    } as RegisterDataMobi;
    return data;
  }
  return undefined;
}
