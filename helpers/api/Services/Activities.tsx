import { Api } from '../Api';
import { ActivityI } from '../../../FrontendSelfTypes/moduleProps/ComponentsProps';

export async function getLastActivitiesService(): Promise<
  Array<ActivityI> | undefined
> {
  try {
    const data = await Api.getAllActivities();
    return data.lastActivities as Array<ActivityI>;
  } catch (e) {
    return undefined;
  }
}
