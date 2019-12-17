import { alertTypes } from '../../alert';
import { playlistAPI } from '../../../api';

export const finishRearrangeScratchpadItem = (
  playlistId,
  itemId,
  toIndex,
  propertiesToUpdate,
) => async dispatch => {
  try {
    if (toIndex != null) {
      playlistAPI.rearrangeScratchpadItem(playlistId, itemId, toIndex);
    }
    if (Object.keys(propertiesToUpdate).length > 0) {
      playlistAPI.updateScratchpadItem(playlistId, itemId, propertiesToUpdate);
    }
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
