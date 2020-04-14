import axios from 'axios';
import { ROOT_USERS_URL } from '../root';

export async function search(values) {
  const { q = '', status = 'All' } = values;

  return axios.get(`${ROOT_USERS_URL}/search?`, {
    params: {
      q,
      status,
    },
  });
}
