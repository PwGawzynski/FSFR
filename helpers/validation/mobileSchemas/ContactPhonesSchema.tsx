import * as Yup from 'yup';

export const ContactPhonesSchema = Yup.object().shape({
  contactPhone: Yup.string()
    .min(13, 'Number must have 9 digits')
    .max(13, 'Number must have 9 digits'),
});
