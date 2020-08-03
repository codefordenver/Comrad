import axios from 'axios';
import { ROOT_HOST_GROUPS_URL } from '../root';

export function findById(id) {
  return axios.get(ROOT_HOST_GROUPS_URL + '/' + id);
}
