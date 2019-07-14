import axios from 'axios';
import { ROOT_RESOURCES_URL } from '../root';

export function add(values) {
  return axios.post(ROOT_RESOURCES_URL, values);
}
