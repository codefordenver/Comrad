import axios from 'axios';
import { ROOT_LIBRARY_URL } from '../root';

export function search(type, searchString, limit, searchItunes) {
  let searchUrl = `${ROOT_LIBRARY_URL}/search?`;
  let parameters = [];
  if (type != null) {
    parameters.push('type=' + type);
  }
  if (searchString != null) {
    parameters.push('s=' + searchString);
  }
  if (limit != null) {
    parameters.push('limit=' + limit);
  }
  if (searchItunes) {
    parameters.push('searchItunes=1');
  }
  searchUrl += parameters.join('&');
  return axios.get(searchUrl);
}
