import axios from 'axios';
import { ROOT_LIBRARY_URL } from '../root';

export function importFromItunes(id) {
  return axios.post(`${ROOT_LIBRARY_URL}/itunes/${id}`);
}
