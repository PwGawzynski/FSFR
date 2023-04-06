import * as Yup from 'yup';

export const PersonalDataSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Name must be defined and have at lest 1 character')
    .max(70, 'Name cannot be longer than 70 characters'),
  surname: Yup.string()
    .min(1, 'Surname must be defined and have at least 1 character')
    .max(250, 'Surname cant be longer than 250 characters'),
});
