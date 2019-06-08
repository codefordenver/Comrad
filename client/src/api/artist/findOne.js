import axios from 'axios';
import { ROOT_ARTISTS_URL } from '../root';

export function findOne(artistId) {
  return axios.get(`${ROOT_ARTISTS_URL}/${artistId}`);
}
