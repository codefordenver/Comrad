import axios from 'axios';
import { ROOT_LIBRARY_URL } from '../root';

export function findItunes(id) {
  return axios.get(`${ROOT_LIBRARY_URL}/itunes/${id}`);
}
