import {
  ActiveFilterValue,
  Worker,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export const defaultWorkerFilter = (
  worker: Worker,
  filter: ActiveFilterValue<Worker>,
  searchValue: string,
) => {
  if (!filter.active) return true;
  if (
    worker[filter.active.main] !== undefined &&
    filter.active.subOption !== undefined
  ) {
    return worker[filter.active.main] === Number(filter.active.subOption);
  }
  return worker[filter.active.main].toString().includes(searchValue);
};
