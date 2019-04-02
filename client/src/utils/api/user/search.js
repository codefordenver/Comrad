import axios from 'axios';

export async function search({ filter = 'all', s = '' }) {
  let url = '/api/user/search?';
  url += `filter=${filter}`;
  url += `&s=${s}`;

  return axios.get(url);
}
