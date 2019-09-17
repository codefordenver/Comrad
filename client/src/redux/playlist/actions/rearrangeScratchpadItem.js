import { alertTypes } from '../../alert';
import { playlistTypes } from '../playlistTypes';
import { playlistAPI } from '../../../api';

export const rearrangeScratchpadItem = (
  playlistId,
  fromIndex,
  toIndex,
) => async dispatch => {
  try {
    dispatch({
      type: playlistTypes.REARRANGE_SCRATCHPAD_ITEM,
      payload: { playlistId, fromIndex, toIndex },
    });
  } catch (err) {
    console.log('Playlist Rearrange Scratchpad Item Error: ', err);
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
