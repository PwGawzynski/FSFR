import { FieldI } from '../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { Api } from '../Api';
import { FieldResponseBase } from '../../../FarmServiceTypes/Field/Ressponses';
import { CreateFieldReqI } from '../../../FarmServiceTypes/Field/Requests';

export async function getAllFieldsByOrderId(
  id: string,
): Promise<Array<FieldResponseBase> | undefined> {
  try {
    const data = await Api.getAllFieldsByOrderId(id);
    return data.data.payload as Array<FieldResponseBase>;
  } catch (e) {
    return undefined;
  }
}

export async function getAllFieldsById(
  id: string,
): Promise<FieldI | undefined> {
  try {
    const data = await Api.getAllFieldsById(id);
    return data as FieldI;
  } catch (e) {
    return undefined;
  }
}

export async function createField(
  filed: CreateFieldReqI,
): Promise<FieldResponseBase | undefined> {
  const data = (await Api.createField(filed)).data.payload as FieldResponseBase;
  return data;
}
