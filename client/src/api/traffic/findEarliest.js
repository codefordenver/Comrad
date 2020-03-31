import axios from 'axios';
import { ROOT_TRAFFIC_URL } from '../root';

export function findEarliest(trafficType) {
  return axios.get(ROOT_TRAFFIC_URL + '/earliest?type=' + trafficType);
}
