import axios from 'axios';
import { ROOT_USERS_URL } from '../root';

export function createApiKey(values) {
  return axios.post(`${ROOT_USERS_URL}/api-key`, values);
}
