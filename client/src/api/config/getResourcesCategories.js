import axios from 'axios';
import { ROOT_CONFIG_URL } from '../root';

export function getResourcesCategories() {
  return axios.get(`${ROOT_CONFIG_URL}/getResourcesCategories`);
}
