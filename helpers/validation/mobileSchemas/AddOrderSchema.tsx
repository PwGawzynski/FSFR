import * as Yup from 'yup';

export const AddOrderSchema = Yup.object().shape({
  performanceDate: Yup.string().min(1).required().label('Performance Date'),
  additionalInfo: Yup.string().max(50).required().label('Additional Info'),
  client: Yup.string().min(1).required().label('Client Name'),
  name: Yup.string().min(1).required().label('Task Name'),
});
