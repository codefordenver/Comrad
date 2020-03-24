import axios from 'axios';
import { ROOT_RESOURCES_URL } from '../root';

export function remove(id) {
  return axios.delete(`${ROOT_RESOURCES_URL}/${id}`);
}
