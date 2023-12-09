import { Api } from '../Api';
import { CreateCompanyReqI } from '../../../FarmServiceTypes/Common/Requests';
import { CompanyResponseBase } from '../../../FarmServiceTypes/Company/Ressponses';
import { MachineResponseBase } from '../../../FarmServiceTypes/Machine/Responses';

export const AddCompany = async (
  data: CreateCompanyReqI,
): Promise<CompanyResponseBase | undefined> => {
  return (await Api.createCompany(data)).data.payload;
};

export async function myCompany() {
  return (await Api.company()).payload;
}
export async function getMachines(): Promise<MachineResponseBase[]> {
  return (await Api.getMachines()).payload;
}
