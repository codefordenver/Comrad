import axios from 'axios';
import { ROOT_HOST_GROUPS_URL } from '../root';

export function remove(id) {
  return axios.delete(ROOT_HOST_GROUPS_URL + '/' + id);
}
