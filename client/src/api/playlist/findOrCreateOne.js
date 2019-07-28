import axios from 'axios';
import { ROOT_PLAYLISTS_URL } from '../root';

export function findOrCreateOne(startTime, endTime) {
  return axios.put(
    `${ROOT_PLAYLISTS_URL}/?startTime=${startTime}&endTime=${endTime}`,
  );
}
