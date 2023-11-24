import { AddNewTasksI } from '../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { Api } from '../Api';
import { TaskResponseBase } from '../../../FarmServiceTypes/Task/Restonses';

export async function addNewTask(
  data: AddNewTasksI,
): Promise<boolean | undefined> {
  try {
    return Api.addNewTasks(data);
  } catch (e) {
    return undefined;
  }
}

export async function getAllOrdersTasks(
  data: string,
): Promise<Array<TaskResponseBase> | undefined> {
  try {
    return (await Api.getAllOrdersTasks(data)).data;
  } catch (e) {
    return undefined;
  }
}

export async function remTask(taskId: string): Promise<string | undefined> {
  try {
    return Api.remTaskListElement(taskId);
  } catch (e) {
    return undefined;
  }
}
