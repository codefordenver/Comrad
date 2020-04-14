import { alertTypes } from '../../alert';
import { playlistTypes } from '../playlistTypes';
import { playlistAPI } from '../../../api';

export const addCommentToSavedItems = (
  playlistId,
  description,
) => async dispatch => {
  try {
    dispatch({ type: playlistTypes.SAVING });

    const doc = await playlistAPI.addCommentToSavedItems(
      playlistId,
      description,
    );

    dispatch({
      type: playlistTypes.ADD_COMMENT_TO_SAVED_ITEMS,
      payload: { playlistId, comment: doc.data },
    });
  } catch (err) {
    console.log('Playlist Add Comment To Saved Items Error: ', err);
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
