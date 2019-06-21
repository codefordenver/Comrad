import axios from 'axios';
import { ROOT_ARTISTS_URL } from '../root';

export function findAlbums(artistId) {
  return axios.get(`${ROOT_ARTISTS_URL}/${artistId}/albums`);
}
