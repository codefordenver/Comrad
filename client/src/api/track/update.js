import axios from 'axios';
import { ROOT_TRACKS_URL } from '../root';

export function findOne(trackId, propsToUpdate) {
  return axios.put(`${ROOT_TRACKS_URL}/${trackId}`, propsToUpdate);
}
