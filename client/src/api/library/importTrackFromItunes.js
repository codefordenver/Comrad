import axios from 'axios';
import { ROOT_LIBRARY_URL } from '../root';

export function importTrackFromItunes(track) {
  return axios.put(`${ROOT_LIBRARY_URL}/from-itunes`, track);
}
