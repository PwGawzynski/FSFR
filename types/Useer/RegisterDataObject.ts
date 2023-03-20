export interface EmailAndPasswordData {
  email: string;
  password: string;
}
export interface NameAndSurnameData {
  name: string;
  surname: string;
}
export interface CompanyNameAndNIPData {
  companyName: string;
  nip: string;
}
export interface ContactPhonesData {
  contactPhone: string;
  companyCompactPhone: string;
}
export interface CompanyAddressData {
  city: string;
  postalCode: string;
  houseNumber: string;
  circumference: string;
}

export type RegisterDataObject = EmailAndPasswordData &
  NameAndSurnameData &
  CompanyNameAndNIPData &
  ContactPhonesData &
  CompanyAddressData;
export type RegisterDataMobi = RegisterDataObject;
