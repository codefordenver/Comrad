import axios from 'axios';
import { ROOT_TRACKS_URL } from '../root';

export function add(input) {
  return axios.post(`${ROOT_TRACKS_URL}`, input);
}
