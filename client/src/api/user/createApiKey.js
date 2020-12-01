import axios from 'axios';
import { ROOT_USERS_URL } from '../root';

export function createApiKey(userId) {
  return axios.post(`${ROOT_USERS_URL}/${userId}/api-key`);
}
