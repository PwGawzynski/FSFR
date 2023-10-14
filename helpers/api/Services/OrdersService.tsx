import { Api } from '../Api';
import {
  NewOrderI,
  OrderBaseI,
} from '../../../FrontendSelfTypes/moduleProps/ComponentsProps';

export async function getAllOrders(): Promise<Array<OrderBaseI> | undefined> {
  try {
    const data = await Api.getAllOrders();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return data.orders as Array<OrderBaseI>;
  } catch (e) {
    return undefined;
  }
}

export async function addNewOrder(
  data: NewOrderI,
): Promise<boolean | undefined> {
  try {
    // eslint-disable-next-line no-console
    console.log(await Api.addNewOrder(data));
    return Api.addNewOrder(data);
  } catch (e) {
    return undefined;
  }
}

export async function sendConfirmation(
  data: string,
): Promise<boolean | undefined> {
  try {
    // eslint-disable-next-line no-console
    console.log(await Api.sendConfirmationAsk(data));
    return Api.sendConfirmationAsk(data);
  } catch (e) {
    return undefined;
  }
}

export async function orderFinishAndAccount(
  data: OrderBaseI,
): Promise<boolean | undefined> {
  try {
    // eslint-disable-next-line no-console
    console.log(await Api.orderFinishAndAccount(data));
    return Api.orderFinishAndAccount(data);
  } catch (e) {
    return undefined;
  }
}
