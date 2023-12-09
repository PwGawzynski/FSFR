import { Api } from '../Api';
import { CreateMachineReqI } from '../../../FarmServiceTypes/Machine/Requests';
import { MachineResponseBase } from '../../../FarmServiceTypes/Machine/Responses';

export const createMachine = async (
  data: CreateMachineReqI,
): Promise<MachineResponseBase | undefined> => {
  return (await Api.createMachine(data)).data.payload;
};
