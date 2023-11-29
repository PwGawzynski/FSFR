import { ActiveFilterValue } from '../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { WorkerResponseBase } from '../../FarmServiceTypes/Worker/Responses';
import { PersonalDataBase } from '../../FarmServiceTypes/UserPersonalData/Responses';

export const defaultWorkerFilter = (
  worker: WorkerResponseBase,
  filter: ActiveFilterValue<WorkerResponseBase>,
  searchValue: string,
) => {
  if (!filter.active) return true;
  if (
    worker[filter.active.main] !== undefined &&
    filter.active.subOption !== undefined
  ) {
    return worker[filter.active.main] === Number(filter.active.subOption);
  }
  return (
    worker.personalData[filter.active.main as keyof PersonalDataBase] as any
  )
    ?.toString()
    .includes(searchValue);
};
