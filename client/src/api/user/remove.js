import axios from 'axios';
import { ROOT_USERS_URL } from '../root';

export function remove({ _id }) {
  return axios.delete(`${ROOT_USERS_URL}/${_id}`);
}
