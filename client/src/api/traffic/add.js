import axios from 'axios';
import { ROOT_TRAFFIC_URL } from '../root';

export function add(newTraffic) {
  return axios.post(ROOT_TRAFFIC_URL, newTraffic);
}
