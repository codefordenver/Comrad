import axios from 'axios';
import { ROOT_TRACKS_URL } from '../root';

export function remove(id) {
  return axios.delete(`${ROOT_TRACKS_URL}/${id}`);
}
