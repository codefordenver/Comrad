import axios from 'axios';
import { ROOT_USERS_URL } from '../root';

export function deleteApiKey(userId) {
  return axios.delete(`${ROOT_USERS_URL}/${userId}/api-key`);
}
