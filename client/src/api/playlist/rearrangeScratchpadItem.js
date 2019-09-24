import axios from 'axios';
import { ROOT_PLAYLISTS_URL } from '../root';

export function rearrangeScratchpadItem(playlistId, itemId, toIndex) {
  return axios.put(
    `${ROOT_PLAYLISTS_URL}/${playlistId}/scratchpad/${itemId}/rearrange`,
    {
      toIndex,
    },
  );
}
