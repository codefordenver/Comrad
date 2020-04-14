import { alertTypes } from '../../alert';
import { playlistTypes } from '../playlistTypes';
import { playlistAPI } from '../../../api';

export const addTrackToSavedItems = (playlistId, trackId) => async dispatch => {
  try {
    dispatch({ type: playlistTypes.SAVING });

    const doc = await playlistAPI.addTrackToSavedItems(playlistId, trackId);

    dispatch({
      type: playlistTypes.ADD_TRACK_TO_SAVED_ITEMS,
      payload: { playlistId, track: doc.data },
    });
  } catch (err) {
    console.log('Playlist Add Track To Saved Items Error: ', err);
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
