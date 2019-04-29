import axios from 'axios';
import { ROOT_USERS_URL } from '../root';

export async function search({ filter = 'all', q = '' }) {
  return axios.get(`${ROOT_USERS_URL}/search?`, {
    params: {
      q,
      filter,
    },
  });
}
