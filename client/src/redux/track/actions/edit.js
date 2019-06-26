import { trackAPI } from '../../../api';
import { trackTypes } from '../trackTypes';

export const edit = (input, callback, id) => async dispatch => {
  try {
    const track = await trackAPI.findOne(id);
    dispatch({ type: track.EDIT, payload: track.data });
    callback(track.data);
  } catch (e) {
    console.error(e);
    dispatch({
      type: trackTypes.ALERT,
      payload: { type: 'danger', body: e.response.data.errorMessage },
    });
  }
};
