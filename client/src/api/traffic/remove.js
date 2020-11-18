import axios from 'axios';
import { ROOT_TRAFFIC_URL } from '../root';

export function remove(trafficId) {
  return axios.delete(ROOT_TRAFFIC_URL + '/' + trafficId);
}
