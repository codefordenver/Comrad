import axios from 'axios';
import { ROOT_PLAYLISTS_URL } from '../root';

export function rearrangeSavedItem(playlistId, itemId, toIndex) {
  return axios.put(
    `${ROOT_PLAYLISTS_URL}/${playlistId}/saved-items/${itemId}/rearrange`,
    {
      toIndex,
    },
  );
}
