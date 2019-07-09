import axios from 'axios';
import { ROOT_RESOURCES_URL } from '../root';

export function search(values) {
  const { category } = values;

  return axios.get(`${ROOT_RESOURCES_URL}/search`, {
    params: {
      category,
    },
  });
}
