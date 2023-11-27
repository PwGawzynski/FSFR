import { MaterialWorkersRootTopTabParamList } from './MaterialWorkersRootTopTabParamList';
import { WorkerResponseBase } from '../../FarmServiceTypes/Worker/Responses';

export type WorkersStackParamList = {
  workersRoot: MaterialWorkersRootTopTabParamList;

  workersLocation: undefined;

  workerDetails: { worker: WorkerResponseBase };

  workerWorkDayDetails: undefined;

  workerWorkDaysInfo: undefined;
};
