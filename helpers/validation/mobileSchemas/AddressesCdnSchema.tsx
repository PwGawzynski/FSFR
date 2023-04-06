import * as Yup from 'yup';

export const AddressesCdnSchema = Yup.object().shape({
  apartmentNumber: Yup.string()
    .min(
      1,
      'Apartment number must be defined, and must have at least one number',
    )
    .max(20, 'Apartment number cant be longer then 20 characters'),
  houseNumber: Yup.string()
    .min(1, 'House number must be defined, and must have at least one number')
    .max(20, 'House number cant be longer then 20 characters'),
  postalCode: Yup.string().matches(/^[0-9]{2}-[0-9]{3}$/, {
    message: `Postal code must be in "00-000" pattern`,
  }),
});
