import * as Yup from 'yup';

export const AddressesCdnSchema = Yup.object().shape({
  apartmentNumber: Yup.string().min(1).max(20),
  houseNumber: Yup.string().min(1).max(20),
  postalCode: Yup.string().matches(/^[0-9]{2}-[0-9]{3}$/),
});
