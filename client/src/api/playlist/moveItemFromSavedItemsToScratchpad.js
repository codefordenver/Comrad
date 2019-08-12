import axios from 'axios';
import { ROOT_PLAYLISTS_URL } from '../root';

export function moveItemFromSavedItemsToScratchpad(playlistId, itemId) {
  return axios.delete(
    `${ROOT_PLAYLISTS_URL}/${playlistId}/saved-items/${itemId}`,
  );
}
