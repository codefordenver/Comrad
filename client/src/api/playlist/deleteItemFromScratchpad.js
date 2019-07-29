import axios from 'axios';
import { ROOT_PLAYLISTS_URL } from '../root';

export function deleteItemFromScratchpad(playlistId, itemId) {
  return axios.delete(
    `${ROOT_PLAYLISTS_URL}/${playlistId}/scratchpad/${itemId}`,
  );
}
