import {
  NewWorker,
  Worker,
} from '../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { Api } from '../Api';

export async function getAllWorkers(
  externalDataOn?: true,
): Promise<Array<Worker> | undefined> {
  try {
    if (externalDataOn) return undefined;
    return (await Api.getWorkers()).workers;
  } catch (e) {
    return undefined;
  }
}

export async function addNewWorker(
  data: NewWorker,
): Promise<boolean | undefined> {
  try {
    // eslint-disable-next-line no-console
    return Api.addNewWorker(data);
  } catch (e) {
    return undefined;
  }
}
