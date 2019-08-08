import axios from 'axios';
import { ROOT_LIBRARY_URL } from '../root';

export function remove(id) {
  return axios.delete(`${ROOT_LIBRARY_URL}/${id}`);
}
