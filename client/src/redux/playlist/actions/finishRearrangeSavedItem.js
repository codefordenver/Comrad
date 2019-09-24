import { alertTypes } from '../../alert';
import { playlistAPI } from '../../../api';

export const finishRearrangeSavedItem = (
  playlistId,
  itemId,
  toIndex,
) => async dispatch => {
  try {
    playlistAPI.rearrangeSavedItem(playlistId, itemId, toIndex);
  } catch (err) {
    console.log('Playlist Finish Rearrange Saved Item Error: ', err);
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
