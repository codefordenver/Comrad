import axios from 'axios';
import { ROOT_AUTH_URL } from '../root';

export function logout() {
  return axios.get(`${ROOT_AUTH_URL}/logout`);  
}
