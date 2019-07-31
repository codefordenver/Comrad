import axios from 'axios';
import { ROOT_TRAFFIC_URL } from '../root';

export function find(startDate, endDate) {
  const params = {
    startDate: '"' + startDate + '"',
    endDate: '"' + endDate + '"',
  };

  return axios.get(ROOT_TRAFFIC_URL, {
    params: params,
  });
}
