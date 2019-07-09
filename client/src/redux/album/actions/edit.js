import { albumAPI } from '../../../api';
import { albumTypes } from '../albumTypes';

export const edit = (data, callback) => async dispatch => {
  try {
    const _id = data.id;
    const album = await albumAPI.update(data, _id);
    dispatch({ type: albumTypes.EDIT, payload: album.data });
    callback(data);
  } catch (e) {
    console.error(e);
    dispatch({
      type: albumTypes.ALERT,
      payload: { type: 'danger', body: e.response.data.errorMessage },
    });
  }
};
