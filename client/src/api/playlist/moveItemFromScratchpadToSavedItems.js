import axios from 'axios';
import { ROOT_PLAYLISTS_URL } from '../root';

export function moveItemFromScratchpadToSavedItems(playlistId, itemId) {
  return axios.put(`${ROOT_PLAYLISTS_URL}/${playlistId}/scratchpad`, {
    itemId,
  });
}
