import * as Yup from 'yup';
import { NewClientShortCreateI } from '../../../FrontendSelfTypes/moduleProps/ComponentsProps';

export const AddOrderSchema: Yup.ObjectSchema<AddOrderSchemaI> =
  Yup.object().shape({
    performanceDate: Yup.string().min(1).required().label('Performance Date'),
    additionalInfo: Yup.string().max(50).required().label('Additional Info'),
    client: Yup.string().min(1).required().label('Client Name'),
    name: Yup.string().min(1).required().label('Task Name'),
  });

export interface AddOrderSchemaI {
  performanceDate: string;
  additionalInfo: string;
  client: string;
  name: string;
}

export const AddNewClientShortSchema: Yup.ObjectSchema<NewClientShortCreateI> =
  Yup.object().shape({
    email: Yup.string().email().label("Client's Email Address").required(),
    phoneNumber: Yup.string()
      .min(13)
      .max(13)
      .label("Client's Phone Number")
      .required(),
    name: Yup.string().min(1).max(100).label("Client's Name").required(),
  });
