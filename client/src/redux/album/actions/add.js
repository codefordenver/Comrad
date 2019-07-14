import { albumAPI } from '../../../api';
import { albumTypes } from '../albumTypes';

export const add = (input, callback) => async dispatch => {
  try {
    const addedAlbum = await albumAPI.add(input);
    dispatch({ type: albumTypes.ADD, payload: addedAlbum.data });
    callback(addedAlbum.data);
  } catch (e) {
    console.error(e);
    dispatch({
      type: albumTypes.ALERT,
      payload: { type: 'danger', body: e.response.data.errorMessage },
    });
  }
};
