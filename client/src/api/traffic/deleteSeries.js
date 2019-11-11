import axios from 'axios';
import { ROOT_TRAFFIC_URL } from '../root';

export function deleteSeries(trafficSeriesId) {
  return axios.delete(ROOT_TRAFFIC_URL + '/' + trafficSeriesId);
}
