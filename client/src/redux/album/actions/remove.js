import { albumTypes } from '../albumTypes';
import { albumAPI } from '../../../api';
import { alertTypes } from '../../alert';

export const remove = (id, callback, errorCallback) => async dispatch => {
  try {
    const removedAlbum = await albumAPI.remove(id);

    if (typeof callback === 'function') {
      callback(removedAlbum);
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
