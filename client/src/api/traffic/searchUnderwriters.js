import axios from 'axios';
import { ROOT_TRAFFIC_URL } from '../root';

export function searchUnderwriters(searchString) {
  return axios.get(`${ROOT_TRAFFIC_URL}/search-underwriters?s=${searchString}`);
}
