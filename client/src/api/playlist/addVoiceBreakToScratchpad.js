import axios from 'axios';
import { ROOT_PLAYLISTS_URL } from '../root';

export function addVoiceBreakToScratchpad(playlistId) {
  return axios.put(
    `${ROOT_PLAYLISTS_URL}/${playlistId}/scratchpad/voice-break`,
  );
}
