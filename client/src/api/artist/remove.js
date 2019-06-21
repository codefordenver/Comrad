import axios from 'axios';
import { ROOT_ARTISTS_URL } from '../root';

export function remove(id) {
  return axios.delete(`${ROOT_ARTISTS_URL}/${id}`);
}
