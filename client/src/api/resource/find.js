import axios from 'axios';
import { ROOT_RESOURCES_URL } from '../root';

export function find(category) {
  let params = {};
  if (category != null) {
    params.category = category;
  }
  return axios.get(`${ROOT_RESOURCES_URL}`, { params });
}
