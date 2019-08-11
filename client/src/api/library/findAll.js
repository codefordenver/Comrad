import axios from 'axios';
import { ROOT_LIBRARY_URL } from '../root';

export function findAll(type, sort, page) {
  let findUrl = `${ROOT_LIBRARY_URL}/?`;
  let parameters = [];
  if (type != null) {
    parameters.push('type=' + type);
  }
  if (sort != null && sort.id != null) {
    parameters.push('sortBy=' + sort.id);
  }
  if (sort != null && sort.desc != null) {
    if (sort.desc) {
      parameters.push('sortDescending=true');
    } else {
      parameters.push('sortDescending=false');
    }
  }
  if (page != null) {
    parameters.push('page=' + page);
  }
  findUrl += parameters.join('&');
  return axios.get(findUrl);
}
