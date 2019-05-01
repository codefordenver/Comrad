import axios from 'axios';

export async function searchHosts({ filter = 'All', q = '' }) {
  let url = '/v1/users/search-hosts?';
  url += `filter=${filter}`;
  url += `&q=${q}`;

  return axios.get(url);
}
