import * as Yup from 'yup';
import { useEffect, useState } from 'react';

export const useValidation = <T extends object>(
  data: T,
  schema: Yup.ObjectSchema<T>,
  dependencyArray?: Array<boolean>,
) => {
  const [validationError, setValidationError] = useState({
    isError: false,
    errorMessages: [] as Array<string>,
  });
  const [canValidate, setCanValidate] = useState(true);
  useEffect(
    () => {
      (async () => {
        if (canValidate) {
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
            setCanValidate(false);
          }
        }
        setCanValidate(false);
      })();
    },
    dependencyArray ? [...dependencyArray, canValidate] : [],
  );
  return [validationError, setCanValidate] as const;
};
