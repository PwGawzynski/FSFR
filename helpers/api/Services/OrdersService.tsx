import { Api } from '../Api';
import {
  NewOrderI,
  OrderBaseI,
} from '../../../FrontendSelfTypes/moduleProps/ComponentsProps';

export async function getAllOrders(): Promise<Array<OrderBaseI> | undefined> {
  try {
    const data = await Api.getAllOrders();
    return data.orders as Array<OrderBaseI>;
  } catch (e) {
    return undefined;
  }
}

export async function addNewOrder(
  data: NewOrderI,
): Promise<boolean | undefined> {
  try {
    console.log(await Api.addNewOrder(data));
    return Api.addNewOrder(data);
  } catch (e) {
    return undefined;
  }
}

export async function orderFinishAndAccount(
  data: OrderBaseI,
): Promise<boolean | undefined> {
  try {
    console.log(await Api.orderFinishAndAccount(data));
    return Api.orderFinishAndAccount(data);
  } catch (e) {
    return undefined;
  }
}
