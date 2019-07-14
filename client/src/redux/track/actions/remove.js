import { trackTypes } from '../trackTypes';
import { trackAPI } from '../../../api';
import { alertTypes } from '../../alert';

export const remove = (id, callback, errorCallback) => async dispatch => {
  try {
    const removedTrack = await trackAPI.remove(id);

    if (typeof callback === 'function') {
      callback(removedTrack);
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
