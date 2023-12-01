import { DataFromXMLRes } from '../../../FarmServiceTypes/Field/Ressponses';
import { GeoPortalApi } from '../GeoportalApi';

export async function getDataFromCords(data: {
  longitude: string;
  latitude: string;
}): Promise<DataFromXMLRes | undefined> {
  try {
    return await GeoPortalApi.driver(data.longitude, data.latitude);
  } catch (e) {
    return undefined;
  }
}
