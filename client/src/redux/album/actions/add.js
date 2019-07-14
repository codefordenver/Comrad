import { albumAPI } from '../../../api';
import { albumTypes } from '../albumTypes';
import { alertTypes } from '../../alert';

export const add = (input, callback) => async dispatch => {
  try {
    const addedAlbum = await albumAPI.add(input);
    dispatch({ type: albumTypes.ADD, payload: addedAlbum.data });
    if (typeof callback === 'function') {
      callback(addedAlbum.data);
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
  }
};
