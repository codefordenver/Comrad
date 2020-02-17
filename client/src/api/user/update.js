import axios from 'axios';
import { ROOT_USERS_URL } from '../root';

export function update(propsToUpdate, id) {
  return axios.put(ROOT_USERS_URL + '/' + id, propsToUpdate);
}
