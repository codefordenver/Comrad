import axios from 'axios';
import { ROOT_TRAFFIC_URL } from '../root';

export function find(
  startDate,
  endDate,
  filterByType,
  cancellableRequestId = false, // if provided, this should be a string. Only one active request using this cancellableRequestId will be allowed at a time. Subsequent requests will cause previous unfinished requests to be cancelled.
) {
  const params = {
    startDate: startDate,
    endDate: endDate,
    filterByTrafficType: filterByType,
  };

  // cancel the previous request, if it exists
  if (
    cancellableRequestId != false &&
    window.activeTrafficFindAxiosRequest != null &&
    window.activeTrafficFindAxiosRequest[cancellableRequestId] != null
  ) {
    window.activeTrafficFindAxiosRequest[cancellableRequestId].cancel();
  }

  let axiosOptions = { params: params };
  var cancelToken;

  //save the source to a global variable so we can cancel it later, if necessary
  if (cancellableRequestId) {
    if (typeof window.activeTrafficFindAxiosRequest === 'undefined') {
      window.activeTrafficFindAxiosRequest = {};
    }
    cancelToken = axios.CancelToken.source();
    window.activeTrafficFindAxiosRequest[cancellableRequestId] = cancelToken;
    axiosOptions.cancelToken = cancelToken.token;
  }

  return axios.get(ROOT_TRAFFIC_URL, axiosOptions);
}
