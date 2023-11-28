import { WorkerDesktopMaterialParamList } from './WorkerDesktopMaterialParamList';
import { TaskResponseBase } from '../../../FarmServiceTypes/Task/Restonses';

export type WorkerStackParamList = {
  root: WorkerDesktopMaterialParamList;
  task: { task?: TaskResponseBase | undefined };
};
