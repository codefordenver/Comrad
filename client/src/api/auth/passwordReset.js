import axios from 'axios';
import { ROOT_AUTH_URL } from '../root';

export function passwordReset({ email }) {
  return axios.put(`${ROOT_AUTH_URL}/password/reset`, { email });
}
