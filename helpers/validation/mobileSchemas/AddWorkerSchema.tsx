import * as Yup from 'yup';
import { NewWorker } from '../../../FrontendSelfTypes/moduleProps/ComponentsProps';

export const AddWorkerSchema: Yup.ObjectSchema<NewWorker> = Yup.object().shape({
  name: Yup.string().label('Worker Name').min(1).max(50).required(),
  surname: Yup.string().label('Worker Name').min(1).max(50).required(),
  phone: Yup.string()
    .label('Worker phone number')
    .matches(/(\+48|0048)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}/, {
      excludeEmptyString: true,
      message:
        "Worker's phone number must be valid number like +48 000 000 000, +48 000-000-000, 000-000-000",
    })
    .required(),
  position: Yup.number().label('Worker position').required(),
  status: Yup.number().label('Worker status').required(),
  address: Yup.string().label("Worker's address ").min(1).max(100).required(),
  province: Yup.string().label("Worker's province").min(1).max(100).required(),
  county: Yup.string().label("Worker's county").min(1).max(100).required(),
  email: Yup.string().email().label("Worker's email").required(),
  photoUrl: Yup.string().optional(),
  dateOfBirth: Yup.string()
    .label("Worker's date of birth")
    .matches(
      /\d{4}-\d{2}-\d{2}/,
      "Worker's date of birth must follow YYYY-MM-DD pattern",
    )
    .required(),
});
