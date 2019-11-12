import { alertTypes } from '../../alert';
import { playlistTypes } from '../playlistTypes';
import { playlistAPI } from '../../../api';

export const addVoiceBreakToScratchpad = playlistId => async dispatch => {
  try {
    dispatch({ type: playlistTypes.SAVING });

    const doc = await playlistAPI.addVoiceBreakToScratchpad(playlistId);

    dispatch({
      type: playlistTypes.ADD_VOICE_BREAK_TO_SCRATCHPAD,
      payload: { playlistId, voice_break: doc.data },
    });
  } catch (err) {
    console.log('Playlist Add Voice Break To Scratchpad Error: ', err);
    dispatch({
      type: alertTypes.ACTIVE,
      payload: {
        type: 'danger',
        header: 'Error',
        body:
          'There was an issue saving your data. Please reload the page and try again.',
      },
    });
  }
};
