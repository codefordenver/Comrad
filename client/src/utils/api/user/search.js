import axios from 'axios';

export async function search({ filter = 'All', q = '' }) {
  let url = '/v1/users/search?';
  url += `filter=${filter}`;
  url += `&q=${q}`;

  return axios.get(url);
}
