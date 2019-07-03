import axios from 'axios';
import { ROOT_ALBUMS_URL } from '../root';

export function update(propsToUpdate, id) {
  return axios.put(`${ROOT_ALBUMS_URL}/${id}`, propsToUpdate);
}
