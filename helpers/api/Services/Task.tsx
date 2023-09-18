import { AddNewTasksI } from '../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { Api } from '../Api';

export async function addNewTask(
  data: AddNewTasksI,
): Promise<boolean | undefined> {
  try {
    return Api.addNewTasks(data);
  } catch (e) {
    return undefined;
  }
}
