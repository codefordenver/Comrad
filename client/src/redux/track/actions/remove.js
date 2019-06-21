import { trackTypes } from '../trackTypes';
import { trackAPI } from '../../../api';

export const remove = (id, callback) => async dispatch => {
  try {
    const removedTrack = await trackAPI.remove(id);

    if (typeof callback === 'function') {
      callback(removedTrack);
    }
  } catch (e) {
    console.error(e);
    dispatch({
      type: trackTypes.ALERT,
      payload: { type: 'danger', body: e.response.data.errorMessage },
    });
  }
};
