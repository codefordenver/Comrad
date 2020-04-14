import { alertTypes } from '../../alert';
import { playlistTypes } from '../playlistTypes';

export const updateScratchpadItem = (
  playlistId,
  itemId,
  propertiesToUpdate,
) => async dispatch => {
  try {
    dispatch({
      type: playlistTypes.UPDATE_SCRATCHPAD_ITEM,
      payload: { playlistId, itemId, propertiesToUpdate },
    });
  } catch (err) {
    console.log('Playlist update Scratchpad Item Error: ', err);
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
