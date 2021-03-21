import axios from 'axios';
import { ROOT_TRAFFIC_URL } from '../root';

export function find(startDate, endDate, filterByType) {
  const params = {
    startDate: startDate,
    endDate: endDate,
    filterByTrafficType: filterByType,
  };

  // cancel the previous request, if it exists
  if (window.activeTrafficFindAxiosRequest != null) {
    console.log(window.activeTrafficFindAxiosRequest);
    window.activeTrafficFindAxiosRequest.cancel();
  }

  //save the source to a global variable so we can cancel it later, if necessary
  window.activeTrafficFindAxiosRequest = axios.CancelToken.source();

  return axios.get(ROOT_TRAFFIC_URL, {
    params: params,
    cancelToken: window.activeTrafficFindAxiosRequest.token,
  });
}
