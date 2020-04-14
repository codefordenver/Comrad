import axios from 'axios';
import { ROOT_USERS_URL } from '../root';

export function deleteApiKey(values) {
  return axios.put(`${ROOT_USERS_URL}/api-key/delete`, values);
}
