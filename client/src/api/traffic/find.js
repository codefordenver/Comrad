import axios from 'axios';
import { ROOT_TRAFFIC_URL } from '../root';

export function find(startDate, endDate, filterByType) {
  const params = {
    startDate: '"' + startDate + '"',
    endDate: '"' + endDate + '"',
    filterByTrafficType: filterByType,
  };

  return axios.get(ROOT_TRAFFIC_URL, {
    params: params,
  });
}
