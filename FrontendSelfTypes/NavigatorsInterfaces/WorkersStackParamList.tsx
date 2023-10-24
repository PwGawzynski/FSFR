import { MaterialWorkersRootTopTabParamList } from './MaterialWorkersRootTopTabParamList';
import { Worker } from '../moduleProps/ComponentsProps';

export type WorkersStackParamList = {
  workersRoot: MaterialWorkersRootTopTabParamList;

  workersLocation: undefined;

  workerDetails: { worker: Worker };

  workerWorkDayDetails: undefined;

  workerWorkDaysInfo: undefined;
};
