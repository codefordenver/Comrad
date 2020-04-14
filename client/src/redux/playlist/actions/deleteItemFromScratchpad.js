import { alertTypes } from '../../alert';
import { playlistTypes } from '../playlistTypes';
import { playlistAPI } from '../../../api';

export const deleteItemFromScratchpad = (
  playlistId,
  itemId,
) => async dispatch => {
  try {
    dispatch({ type: playlistTypes.SAVING });

    await playlistAPI.deleteItemFromScratchpad(playlistId, itemId);

    dispatch({
      type: playlistTypes.DELETE_ITEM_FROM_SCRATCHPAD,
      payload: { playlistId, deletedItem: itemId },
    });
  } catch (err) {
    console.log('Playlist Delete From Scratchpad Error: ', err);
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
