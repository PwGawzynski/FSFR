import { Api } from '../Api';
import { OrderResponseBase } from '../../../FarmServiceTypes/Order/Ressponses';
import {
  CreateOrderReqI,
  UpdateOrderSetPricePerUnit,
} from '../../../FarmServiceTypes/Order/Requests';
import { ResponseObject } from '../../../FarmServiceTypes/Respnse/responseGeneric';

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
  data: CreateOrderReqI,
): Promise<ResponseObject | undefined> {
  try {
    return (await Api.addNewOrder(data)).data;
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
  data: UpdateOrderSetPricePerUnit,
): Promise<ResponseObject | undefined> {
  return (await Api.orderFinishAndAccount(data)).data;
}
