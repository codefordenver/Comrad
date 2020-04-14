import axios from 'axios';
import { ROOT_PLAYLISTS_URL } from '../root';

export function addCommentToScratchpad(playlistId, description) {
  return axios.put(`${ROOT_PLAYLISTS_URL}/${playlistId}/scratchpad/comment`, {
    description,
  });
}
