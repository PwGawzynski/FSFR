import * as Yup from 'yup';

export const AddressesSchema = Yup.object().shape({
  city: Yup.string()
    .min(1, 'City must be defined, and have at lest one character')
    .max(70, 'City name cannot be longer than 70 characters'),
  county: Yup.string()
    .min(1, 'County must be defined, and have at lest one character')
    .max(50, 'County name cant be longer than 50'),
  street: Yup.string()
    .min(1, 'Street must be defined, and have at lest one character')
    .max(100, 'Street name cant be longer than 100 characters'),
  voivodeship: Yup.string()
    .min(1, 'Voivodeship must be defined, and have at lest one character')
    .max(50, 'Voivodeship name cant be longer than 50 characters'),
});
