import axios from 'axios';
import { ROOT_PLAYLISTS_URL } from '../root';

export function findOne(startTime, endTime) {
  return axios.get(
    `${ROOT_PLAYLISTS_URL}/?startTime=${startTime}&endTime=${endTime}`,
  );
}
