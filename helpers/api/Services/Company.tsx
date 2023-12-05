import { Api } from '../Api';
import { CreateCompanyReqI } from '../../../FarmServiceTypes/Common/Requests';
import { CompanyResponseBase } from '../../../FarmServiceTypes/Company/Ressponses';

export const AddCompany = async (
  data: CreateCompanyReqI,
): Promise<CompanyResponseBase | undefined> => {
  return (await Api.createCompany(data)).data.payload;
};

export async function myCompany() {
  return (await Api.company()).payload;
}
