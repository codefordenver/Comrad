import axios from 'axios';
import { ROOT_ALBUMS_URL } from '../root';

export function remove(id) {
  return axios.delete(`${ROOT_ALBUMS_URL}/${id}`);
}
