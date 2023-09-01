import { NewClientShortCreateI } from '../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { Api } from '../Api';

export const AddNewClientShortService = async (
  data: NewClientShortCreateI,
): Promise<boolean | undefined> => {
  try {
    return Api.createNewClientShort(data);
  } catch (e) {
    return undefined;
  }
};
