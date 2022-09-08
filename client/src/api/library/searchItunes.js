import axios from 'axios';
import { ROOT_LIBRARY_URL } from '../root';

export function searchItunes(type, searchString, limit) {
  let searchUrl = ROOT_LIBRARY_URL + "/search-itunes?q=" + encodeURIComponent(searchString);
  return axios.get(searchUrl);
}
