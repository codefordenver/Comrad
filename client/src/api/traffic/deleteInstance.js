import axios from 'axios';
import { ROOT_TRAFFIC_URL } from '../root';

export function deleteInstance(trafficSeriesId, trafficDoc) {
  return axios.delete(ROOT_TRAFFIC_URL + '/instance/' + trafficSeriesId, {
    data: trafficDoc,
  });
}
