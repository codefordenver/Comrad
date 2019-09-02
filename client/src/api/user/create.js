import axios from 'axios';
import { ROOT_USERS_URL } from '../root';

export function create(values) {
  return axios.post(ROOT_USERS_URL, values);
}
