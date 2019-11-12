import axios from 'axios';
import { ROOT_PLAYLISTS_URL } from '../root';

export function addVoiceBreakToSavedItems(playlistId) {
  return axios.put(
    `${ROOT_PLAYLISTS_URL}/${playlistId}/saved-items/voice-break`,
  );
}
