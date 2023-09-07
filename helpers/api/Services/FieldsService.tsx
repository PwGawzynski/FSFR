import { FieldI } from '../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { Api } from '../Api';

export async function getAllFieldsByOrderId(
  id: string,
): Promise<Array<FieldI> | undefined> {
  try {
    const data = await Api.getAllFieldsByOrderId(id);
    return data as Array<FieldI>;
  } catch (e) {
    return undefined;
  }
}
