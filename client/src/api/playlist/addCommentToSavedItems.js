import axios from 'axios';
import { ROOT_PLAYLISTS_URL } from '../root';

export function addCommentToSavedItems(playlistId, description) {
  return axios.put(`${ROOT_PLAYLISTS_URL}/${playlistId}/saved-items/comment`, {
    description,
  });
}
