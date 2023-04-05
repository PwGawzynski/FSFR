import * as Yup from 'yup';

export const AddressesSchema = Yup.object().shape({
  city: Yup.string().min(1).max(70),
  county: Yup.string().min(1).max(50),
  street: Yup.string().min(1).max(100),
  voivodeship: Yup.string().min(1).max(50),
});
