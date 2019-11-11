import axios from 'axios';
import { ROOT_TRAFFIC_URL } from '../root';

export function findById(id) {
  return axios.get(ROOT_TRAFFIC_URL + '/' + id);
}
