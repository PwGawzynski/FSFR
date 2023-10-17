import {
  AddNewTasksI,
  OrderTask,
} from '../../../FrontendSelfTypes/moduleProps/ComponentsProps';
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

export async function getAllOrdersTasks(
  data: string,
): Promise<Array<OrderTask> | undefined> {
  try {
    const res = await Api.getAllOrdersTasks(data);
    const filtered: Array<OrderTask> = [];
    res.forEach(
      orderTask =>
        !filtered.find(
          filteredOrderTask =>
            filteredOrderTask.worker.id === orderTask.worker.id,
        ) && filtered.push(orderTask),
    );
    console.log(filtered, 'filtered');
    return filtered;
  } catch (e) {
    return undefined;
  }
}
