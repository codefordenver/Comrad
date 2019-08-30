import axios from 'axios';
import { ROOT_LIBRARY_URL } from '../root';

export function update(propsToUpdate, id) {
  return axios.put(`${ROOT_LIBRARY_URL}/${id}`, propsToUpdate);
}
