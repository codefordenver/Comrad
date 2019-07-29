import axios from 'axios';
import { ROOT_PLAYLISTS_URL } from '../root';

export function addTrafficToSavedItems(playlistId, masterTimeId) {
  return axios.put(`${ROOT_PLAYLISTS_URL}/${playlistId}/saved-items/traffic`, {
    masterTimeId,
  });
}
