import { Worker } from '../../../FrontendSelfTypes/moduleProps/ComponentsProps';
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
