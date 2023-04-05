import * as Yup from 'yup';

export const PersonalDataSchema = Yup.object().shape({
  name: Yup.string().min(1).max(70),
  surname: Yup.string().min(1).max(250),
});
