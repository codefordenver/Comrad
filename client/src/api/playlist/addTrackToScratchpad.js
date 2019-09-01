import axios from 'axios';
import { ROOT_PLAYLISTS_URL } from '../root';

export function addTrackToScratchpad(playlistId, trackId) {
  return axios.put(`${ROOT_PLAYLISTS_URL}/${playlistId}/scratchpad/track`, {
    trackId,
  });
}
