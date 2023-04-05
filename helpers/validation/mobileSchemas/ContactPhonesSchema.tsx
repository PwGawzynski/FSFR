import * as Yup from 'yup';

export const ContactPhonesSchema = Yup.object().shape({
  contactPhone: Yup.string().min(13).max(13),
});
