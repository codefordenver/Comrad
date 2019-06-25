import { artistAPI } from '../../../api';
import { artistTypes } from '../artistTypes';

export const remove = (id, callback) => async dispatch => {
  try {
    const removedArtist = await artistAPI.remove(id);

    if (typeof callback === 'function') {
      callback(removedArtist);
    }
  } catch (e) {
    console.error(e);
    dispatch({
      type: artistTypes.ALERT,
      payload: { type: 'danger', body: e.response.data.errorMessage },
    });
  }
};
