import axios from 'axios';
import { ROOT_PERMISSION_URL } from '../root';

export function findAll() {
  return axios.get(`${ROOT_PERMISSION_URL}`);
}
