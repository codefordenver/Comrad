import { alertTypes } from '../../alert';
import { playlistTypes } from '../playlistTypes';
import { playlistAPI } from '../../../api';

export const moveItemFromSavedItemsToScratchpad = (
  playlistId,
  itemId,
) => async dispatch => {
  try {
    dispatch({ type: playlistTypes.SAVING });

    const doc = await playlistAPI.moveItemFromSavedItemsToScratchpad(
      playlistId,
      itemId,
    );

    const { data } = doc;

    dispatch({
      type: playlistTypes.MOVE_ITEM_FROM_SAVED_ITEMS_TO_SCRATCHPAD,
      payload: { playlistId, movedItem: data },
    });
  } catch (err) {
    console.log(
      'Playlist Move Item From Saved Items To Scratchpad Error: ',
      err,
    );
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
