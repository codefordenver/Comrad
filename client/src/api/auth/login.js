import axios from 'axios';
import { ROOT_AUTH_URL } from '../root';

export function login({ email, password }) {
  return axios.post(`${ROOT_AUTH_URL}/login`, { email, password });
}
