import { Api } from '../Api';
import { NotificationI } from '../../../FrontendSelfTypes/moduleProps/ComponentsProps';

export async function getAllNotifications(): Promise<
  Array<NotificationI> | undefined
> {
  try {
    const data = await Api.getAllEvents();
    return data.events as Array<NotificationI>;
  } catch (e) {
    return undefined;
  }
}
