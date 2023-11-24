import { Api } from '../Api';
import { CreateWorkerReqI } from '../../../FarmServiceTypes/Worker/Requests';
import { WorkerResponseBase } from '../../../FarmServiceTypes/Worker/Responses';

export async function getAllWorkers(
  externalDataOn?: true,
): Promise<Array<WorkerResponseBase> | undefined> {
  try {
    if (externalDataOn) return undefined;
    return (await Api.getWorkers()).data;
  } catch (e) {
    return undefined;
  }
}

export async function addNewWorker(
  data: CreateWorkerReqI,
): Promise<WorkerResponseBase | undefined> {
  try {
    // eslint-disable-next-line no-console
    return Api.createWorker(data);
  } catch (e) {
    return undefined;
  }
}

export async function getWorker(): Promise<
  { id: string; companyId: string } | undefined
> {
  try {
    return Api.getWorker();
  } catch (e) {
    return undefined;
  }
}
