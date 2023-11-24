import { Api } from '../Api';
import {
  NewOrderI,
  OrderBaseI,
} from '../../../FrontendSelfTypes/moduleProps/ComponentsProps';
import { OrderResponseBase } from '../../../FarmServiceTypes/Order/Ressponses';

export async function getAllOrders(): Promise<
  Array<OrderResponseBase> | undefined
> {
  try {
    const { data } = await Api.getAllOrders();
    return data as Array<OrderResponseBase>;
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
  data: OrderResponseBase,
): Promise<boolean | undefined> {
  try {
    // eslint-disable-next-line no-console
    return Api.orderFinishAndAccount(data);
  } catch (e) {
    return undefined;
  }
}
