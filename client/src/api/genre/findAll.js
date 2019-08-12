import axios from 'axios';
import { ROOT_GENRE_URL } from '../root';

export function findAll() {
  return axios.get(`${ROOT_GENRE_URL}`);
}
