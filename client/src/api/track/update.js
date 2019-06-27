import axios from 'axios';
import { ROOT_TRACKS_URL } from '../root';

export function update(trackId, propsToUpdate) {
  return axios.put(`${ROOT_TRACKS_URL}/${trackId}`, propsToUpdate);
}
