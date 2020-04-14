import axios from 'axios';
import { ROOT_RESOURCES_URL } from '../root';

export function findAll() {
  return axios.get(`${ROOT_RESOURCES_URL}`);
}
