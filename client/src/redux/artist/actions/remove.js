import { artistAPI } from '../../../api';
import { artistTypes } from '../artistTypes';
import { alertTypes } from '../../alert';

export const remove = (id, callback, errorCallback) => async dispatch => {
  try {
    const removedArtist = await artistAPI.remove(id);

    if (typeof callback === 'function') {
      callback(removedArtist);
    }
  } catch (e) {
    console.error(e);
    dispatch({
      type: alertTypes.ACTIVE,
      payload: {
        type: 'danger',
        header: 'Error',
        body: e.response.data.errorMessage,
      },
    });
    if (typeof errorCallback === 'function') {
      errorCallback();
    }
  }
};
