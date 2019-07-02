import { trackAPI } from '../../../api';
import { trackTypes } from '../trackTypes';

export const add = (input, callback) => async dispatch => {
  try {
    const addedTrack = await trackAPI.add(input);
    dispatch({ type: trackTypes.ADD, payload: addedTrack.data });
    callback(addedTrack.data);
  } catch (e) {
    console.error(e);
    dispatch({
      type: trackTypes.ALERT,
      payload: { type: 'danger', body: e.response.data.errorMessage },
    });
  }
};
