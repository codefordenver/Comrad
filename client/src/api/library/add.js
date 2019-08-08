import axios from 'axios';
import { ROOT_LIBRARY_URL } from '../root';

export function add(type, input) {
  return axios.post(`${ROOT_LIBRARY_URL}`, { type, ...input });
}
