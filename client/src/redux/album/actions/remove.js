import { albumTypes } from '../albumTypes';
import { albumAPI } from '../../../api';

export const remove = (id, callback) => async dispatch => {
  try {
    const removedAlbum = await albumAPI.remove(id);

    if (typeof callback === 'function') {
      callback(removedAlbum);
    }
  } catch (e) {
    console.error(e);
    dispatch({
      type: albumTypes.ALERT,
      payload: { type: 'danger', body: e.response.data.errorMessage },
    });
  }
};
