import axios from 'axios';
import { ROOT_USERS_URL } from '../root';

export function findAll() {
  return axios.get(`${ROOT_USERS_URL}`);
}
