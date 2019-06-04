import axios from 'axios';
import { ROOT_ALBUMS_URL } from '../root';

export function findOneTracks(id) {
  return axios.get(`${ROOT_ALBUMS_URL}/${id}/tracks`);
}
