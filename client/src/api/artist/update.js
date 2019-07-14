import axios from 'axios';
import { ROOT_ARTISTS_URL } from '../root';

export function update(artistId, propsToUpdate) {
  return axios.put(`${ROOT_ARTISTS_URL}/${artistId}`, propsToUpdate);
}
