import axios from 'axios';
import { ROOT_ALBUMS_URL } from '../root';

export function findOne(id) {
  return axios.get(`${ROOT_ALBUMS_URL}/${id}`);
}
