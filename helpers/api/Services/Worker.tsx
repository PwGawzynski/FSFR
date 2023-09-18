import { Worker } from '../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { Api } from '../Api';

export async function getAllWorkers(): Promise<Array<Worker> | undefined> {
  console.log('WORKER DATA FETCH');
  try {
    const data = await Api.getWorkers();
    return data.workers as Array<Worker>;
  } catch (e) {
    return undefined;
  }
}
