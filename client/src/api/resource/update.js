import axios from 'axios';
import { ROOT_RESOURCES_URL } from '../root';

export function update(propsToUpdate, id) {
  return axios.put(`${ROOT_RESOURCES_URL}/${id}`, propsToUpdate);
}
