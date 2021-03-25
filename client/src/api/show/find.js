import axios from 'axios';
import { ROOT_SHOWS_URL } from '../root';

export function find(
  startDate,
  endDate,
  host = null,
  onlyDisplayShowsWithNoHost = false,
) {
  // cancel the previous request, if it exists
  if (window.activeShowFindAxiosRequest != null) {
    window.activeShowFindAxiosRequest.cancel();
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

  //save the source to a global variable so we can cancel it later, if necessary
  window.activeShowFindAxiosRequest = axios.CancelToken.source();

  return axios.get(ROOT_SHOWS_URL, {
    params: params,
    cancelToken: window.activeShowFindAxiosRequest.token,
  });
}
