import { Api } from '../Api';
import { OrderBaseI } from '../../../FrontendSelfTypes/moduleProps/ComponentsProps';

export async function getAllOrders(): Promise<Array<OrderBaseI> | undefined> {
  try {
    const data = await Api.getAllOrders();
    return data.orders as Array<OrderBaseI>;
  } catch (e) {
    return undefined;
  }
}
