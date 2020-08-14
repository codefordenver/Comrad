import axios from 'axios';
import { ROOT_HOST_GROUPS_URL } from '../root';

export function update(propsToUpdate, id) {
  return axios.put(`${ROOT_HOST_GROUPS_URL}/${id}`, propsToUpdate);
}
