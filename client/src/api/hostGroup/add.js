import axios from 'axios';
import { ROOT_HOST_GROUPS_URL } from '../root';

export function add(values) {
  return axios.post(ROOT_HOST_GROUPS_URL, values);
}
