import * as Yup from 'yup';

export const EmailAndPasswordSchema = Yup.object().shape({
  email: Yup.string().max(200).email('Invalid Email').required(),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(200, "Password can't be longer than 200 characters")
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`|}{[\]:;\\"'<,>.?/\\-]).+$/)
    .required(),
});
