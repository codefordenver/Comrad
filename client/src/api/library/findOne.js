import axios from 'axios';
import { ROOT_LIBRARY_URL } from '../root';

export function findOne(id) {
  return axios.get(`${ROOT_LIBRARY_URL}/${id}`);
}
