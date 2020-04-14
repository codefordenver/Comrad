import axios from 'axios';
import { ROOT_TRAFFIC_URL } from '../root';

export function search(searchString) {
  return axios.get(`${ROOT_TRAFFIC_URL}/search?s=${searchString}`);
}
