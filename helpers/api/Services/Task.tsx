import { Api } from '../Api';
import { TaskResponseBase } from '../../../FarmServiceTypes/Task/Restonses';
import { CreateTaskBase } from '../../../FarmServiceTypes/Task/Requests';
import { ResponseObject } from '../../../FarmServiceTypes/Respnse/responseGeneric';

export async function addNewTask(
  data: Array<CreateTaskBase>,
): Promise<Promise<ResponseObject> | undefined> {
  try {
    console.log(data, 'DAT_TEST');
    const test = (await Api.addNewTasks(data)).data;
    console.log(test, 'RES');
    return test;
  } catch (e) {
    return undefined;
  }
}

export async function getAllOrdersTasks(
  data: string,
): Promise<Array<TaskResponseBase> | undefined> {
  return (await Api.getAllOrdersTasks(data)).data;
}

export async function remTask(taskId: string): Promise<string | undefined> {
  try {
    return Api.remTaskListElement(taskId);
  } catch (e) {
    return undefined;
  }
}
