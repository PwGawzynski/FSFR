import { WorkerStackParamList } from './WorkerStackParamList';
import { WorkersStackParamList } from '../WorkersStackParamList';
import { MaterialWorkersRootTopTabParamList } from '../MaterialWorkersRootTopTabParamList';

export type WorkerRootStackParamList = {
  assignationCheck: undefined;
  desktop: WorkerStackParamList;
  OperationConfirmed: {
    redirectScreenName:
      | keyof WorkersStackParamList
      | keyof MaterialWorkersRootTopTabParamList;
    shownMessage?: string;
  };
};
