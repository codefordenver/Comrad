import axios from 'axios';
import { ROOT_ARTISTS_URL } from '../root';

export function add(doc) {
  return axios.post(`${ROOT_ARTISTS_URL}/`, doc);
}
