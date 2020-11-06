import axios from 'axios';
import { ROOT_TRAFFIC_URL } from '../root';

export function removeInstanceFromSeries(trafficSeriesId, trafficDoc) {
  return axios.delete(
    ROOT_TRAFFIC_URL + '/remove-instance-from-series/' + trafficSeriesId,
    {
      data: trafficDoc,
    },
  );
}
