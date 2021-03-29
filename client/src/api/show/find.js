import axios from 'axios';
import { ROOT_SHOWS_URL } from '../root';

export function find(
  startDate,
  endDate,
  host = null,
  onlyDisplayShowsWithNoHost = false,
  cancellableRequestId = false, // if provided, this should be a string. Only one active request using this cancellableRequestId will be allowed at a time. Subsequent requests will cause previous unfinished requests to be cancelled.
) {
  // cancel the previous request, if it exists
  if (
    cancellableRequestId &&
    window.activeShowFindAxiosRequest != null &&
    window.activeShowFindAxiosRequest[cancellableRequestId] != null
  ) {
    window.activeShowFindAxiosRequest[cancellableRequestId].cancel();
  }

  if (typeof startDate === 'object' && startDate._isAMomentObject) {
    startDate = startDate.toDate();
  }
  if (typeof endDate === 'object' && endDate._isAMomentObject) {
    endDate = endDate.toDate();
  }
  const params = { startDate, endDate };
  if (host != null) {
    params.host = host;
  }
  if (onlyDisplayShowsWithNoHost) {
    params.showsWithNoHost = true;
  }

  let axiosOptions = { params: params };
  var cancelToken;

  //save the source to a global variable so we can cancel it later, if necessary
  if (cancellableRequestId) {
    if (typeof window.activeShowFindAxiosRequest === 'undefined') {
      window.activeShowFindAxiosRequest = {};
    }
    cancelToken = axios.CancelToken.source();
    window.activeShowFindAxiosRequest[cancellableRequestId] = cancelToken;
    axiosOptions.cancelToken = cancelToken.token;
  }

  return axios.get(ROOT_SHOWS_URL, axiosOptions);
}
