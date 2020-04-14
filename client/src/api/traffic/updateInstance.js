import axios from 'axios';
import { ROOT_TRAFFIC_URL } from '../root';

export function updateInstance(instanceId, instanceData) {
  return axios.patch(ROOT_TRAFFIC_URL + `/${instanceId}`, instanceData);
}
