import axios from 'axios';
import { ROOT_HOST_GROUPS_URL } from '../root';

export function findByHosts(hosts) {
  let hostParameters = '';
  hosts.forEach(h => {
    hostParameters += 'host[]=' + String(h.id) + '&';
  });
  hostParameters = hostParameters.substring(0, hostParameters.length - 1); // remove the trailing & sign
  return axios.get(ROOT_HOST_GROUPS_URL + '?' + hostParameters);
}
