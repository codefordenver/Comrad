import axios from 'axios';
import { ROOT_USERS_URL } from '../root';

export function remove(id) {
  return axios.delete(`${ROOT_USERS_URL}/${id}`);
}
