import axios from 'axios';
import { ROOT_ALBUMS_URL } from '../root';

export function add(input) {
  return axios.post(`${ROOT_ALBUMS_URL}`, input);
}
