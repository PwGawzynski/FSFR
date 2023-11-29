import { Api } from '../Api';
import { CreateWorkerReqI } from '../../../FarmServiceTypes/Worker/Requests';
import { WorkerResponseBase } from '../../../FarmServiceTypes/Worker/Responses';
import { TaskResponseBase } from '../../../FarmServiceTypes/Task/Restonses';
import { ResponseObject } from '../../../FarmServiceTypes/Respnse/responseGeneric';

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

export async function getTasks(): Promise<TaskResponseBase[] | undefined> {
  try {
    return Api.getTasks();
  } catch (e) {
    return undefined;
  }
}

export async function openTask(
  id: string,
): Promise<ResponseObject | undefined> {
  try {
    return Api.openTask(id);
  } catch (e) {
    return undefined;
  }
}

export async function closeTask(
  id: string,
): Promise<ResponseObject | undefined> {
  try {
    return Api.closeTask(id);
  } catch (e) {
    return undefined;
  }
}
