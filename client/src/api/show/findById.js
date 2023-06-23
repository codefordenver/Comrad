import axios from 'axios';
import { ROOT_SHOWS_URL } from '../root';

export function findById(id) {
  return axios.get(ROOT_SHOWS_URL + '/' + id);
}
