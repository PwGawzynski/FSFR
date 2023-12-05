import { UserRole } from '../../FarmServiceTypes/User/Enums';

/**
 * Mobile devices screen data object contains information about  user's email and password
 */
export interface EmailAndPasswordData {
  email: string;
  password: string;
}

/**
 * Mobile devices screen data object contains information user's name and surname
 */
export interface NameAndSurnameData {
  name: string;
  surname: string;
}
/**
 * Mobile devices screen data object contains information about company name and nip
 */
export interface CompanyNameAndNIPData {
  companyName: string;
  nip: string;
}
/**
 * Mobile devices screen data object contains information about  user's contact phone and company's contact phone
 */
export interface ContactPhonesData {
  contactPhone: string;
}

/**
 * Mobile devices screen data object contains information about user's city, postal code, house number, circumference
 */
export interface CompanyAddressData {
  city: string;
  county: string;
  street: string;
  voivodeship: string;
}

export interface CompanyAddressDataCdn {
  houseNumber: string;
  apartmentNumber: string;
  postalCode: string;
}

/**
 * Connected together register information interface
 */
export type RegisterScreensData = EmailAndPasswordData &
  NameAndSurnameData &
  CompanyNameAndNIPData &
  ContactPhonesData &
  CompanyAddressData &
  UserRoleMobiScreen &
  CompanyAddressDataCdn;
export interface RegisterScreensDataCollection extends RegisterScreensData {
  userRole: UserRole;
}
export interface UserRoleMobiScreen {
  worker: boolean;
  owner: boolean;
}
