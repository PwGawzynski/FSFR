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
  useEffect(() => {
    console.log('EFFF');
    (async () => {
      try {
        await schema.validate(data);
        setValidationError({
          isError: false,
          errorMessages: [],
        });
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
  }, [data]);
  return validationError;
};
