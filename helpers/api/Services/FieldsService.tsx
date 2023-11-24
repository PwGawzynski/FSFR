import { FieldI } from '../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { Api } from '../Api';
import { FieldResponseBase } from '../../../FarmServiceTypes/Field/Ressponses';

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
