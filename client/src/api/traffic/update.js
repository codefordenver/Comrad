import axios from 'axios';
import { ROOT_TRAFFIC_URL } from '../root';

export function update(instanceOrSeriesId, instanceData) {
  return axios.put(ROOT_TRAFFIC_URL + `/${instanceOrSeriesId}`, instanceData);
}
