import axios from 'axios';
import { ROOT_PLAYLISTS_URL } from '../root';

export function updateScratchpadItem(playlistId, itemId, propertiesToUpdate) {
  return axios.put(
    `${ROOT_PLAYLISTS_URL}/${playlistId}/scratchpad/${itemId}`,
    propertiesToUpdate,
  );
}
