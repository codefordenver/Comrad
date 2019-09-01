import axios from 'axios';
import { ROOT_PLAYLISTS_URL } from '../root';

export function addTrackToSavedItems(playlistId, trackId) {
  return axios.put(`${ROOT_PLAYLISTS_URL}/${playlistId}/saved-items/track`, {
    trackId,
  });
}
