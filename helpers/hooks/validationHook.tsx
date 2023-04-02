import * as Yup from 'yup';
import { useEffect, useState } from 'react';

export const useValidation = <T extends object>(
  data: T,
  schema: Yup.ObjectSchema<T>,
) => {
  const [validationError, setValidationError] = useState({
    isError: false,
    errorMessages: [] as Array<string>,
  });
  const [canValidate, performValidation] = useState(false);
  useEffect(() => {
    console.log('EFFF');
    (async () => {
      try {
        await schema.validate(data);
      } catch (e) {
        if (e instanceof Yup.ValidationError) {
          setValidationError({
            isError: true,
            errorMessages: e.errors,
          });
        }
      }
    })();
    // eslint-disable-next-line
  }, [canValidate]);
  return [validationError, performValidation] as const;
};
