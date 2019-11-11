import axios from 'axios';
import { ROOT_TRAFFIC_URL } from '../root';

export function createInstance(seriesId, instanceData) {
  return axios.put(ROOT_TRAFFIC_URL + `/${seriesId}`, instanceData);
}
