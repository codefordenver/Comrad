import { alertTypes } from '../../alert';
import { playlistTypes } from '../playlistTypes';
import { playlistAPI } from '../../../api';

export const addTrafficToSavedItems = (
  playlistId,
  masterTimeId,
) => async dispatch => {
  try {
    dispatch({ type: playlistTypes.SAVING });

    const doc = await playlistAPI.addTrafficToSavedItems(
      playlistId,
      masterTimeId,
    );

    const { data } = doc;

    dispatch({
      type: playlistTypes.ADD_TRAFFIC_TO_SAVED_ITEMS,
      payload: { playlistId, trafficItem: data },
    });
  } catch (err) {
    console.log('Playlist Add Traffic To Saved Items Error: ', err);
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
