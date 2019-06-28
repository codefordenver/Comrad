import axios from 'axios';
import { ROOT_TRACKS_URL } from '../root';

export function update(propsToUpdate, id) {
  return axios.put(`${ROOT_TRACKS_URL}/${id}`, propsToUpdate);
}
