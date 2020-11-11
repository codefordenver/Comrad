import axios from 'axios';
import { ROOT_TRAFFIC_URL } from '../root';

export function removeInstanceFromSeries(trafficSeriesId, trafficDoc) {
  return axios.delete(
    ROOT_TRAFFIC_URL + '/' + trafficSeriesId + '/remove-instance-from-series',
    {
      data: trafficDoc,
    },
  );
}
