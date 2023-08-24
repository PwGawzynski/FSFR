import { Api } from '../Api';

export async function getLastActivitiesService() {
  try {
    const data = await Api.getAllActivities();
    return data.lastActivities;
  } catch (e) {
    return undefined;
  }
}
