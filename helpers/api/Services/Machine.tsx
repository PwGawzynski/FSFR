import { Api } from '../Api';
import {
  AssignMachinesReqI,
  CreateMachineReqI,
} from '../../../FarmServiceTypes/Machine/Requests';
import { MachineResponseBase } from '../../../FarmServiceTypes/Machine/Responses';
import { ResponseObject } from '../../../FarmServiceTypes/Respnse/responseGeneric';

export const createMachine = async (
  data: CreateMachineReqI,
): Promise<MachineResponseBase | undefined> => {
  return (await Api.createMachine(data)).data.payload;
};

export const assignMachine = async (
  data: AssignMachinesReqI,
): Promise<ResponseObject | undefined> => {
  return Api.setMachines(data);
};
