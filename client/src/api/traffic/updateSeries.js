import axios from 'axios';
import { ROOT_TRAFFIC_URL } from '../root';

export function updateSeries(trafficSeriesId, data) {
  return axios.patch(ROOT_TRAFFIC_URL + '/series/' + trafficSeriesId, data);
}
