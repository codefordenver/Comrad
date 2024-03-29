import { alertTypes } from '../../alert';
import { playlistTypes } from '../playlistTypes';

export const rearrangeSavedItem = (
  playlistId,
  fromIndex,
  toIndex,
) => async dispatch => {
  try {
    dispatch({
      type: playlistTypes.REARRANGE_SAVED_ITEM,
      payload: { playlistId, fromIndex, toIndex },
    });
  } catch (err) {
    console.log('Playlist Rearrange Saved Item Error: ', err);
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
