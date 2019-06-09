import axios from 'axios';
import { ROOT_SHOWS_URL } from '../root';

export function find(
  startDate,
  endDate,
  host = null,
  onlyDisplayShowsWithNoHost = false,
) {
  const params = { startDate, endDate };
  if (host != null) {
    params.host = host;
  }
  if (onlyDisplayShowsWithNoHost) {
    params.showsWithNoHost = true;
  }
  return axios.get(ROOT_SHOWS_URL, {
    params: params,
  });
}
