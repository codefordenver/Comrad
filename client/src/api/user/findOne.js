import axios from 'axios';
import { ROOT_USERS_URL } from '../root';

export async function findOne(id) {
  return axios.get(`${ROOT_USERS_URL}/${id}`);
}
