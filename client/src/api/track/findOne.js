import axios from 'axios';
import { ROOT_TRACKS_URL } from '../root';

export function findOne(id) {
  return axios.get(`${ROOT_TRACKS_URL}/${id}`);
}
