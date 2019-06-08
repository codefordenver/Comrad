import { artistAPI } from '../../../api';
import { artistTypes } from '../artistTypes';

export const add = (input, callback) => async dispatch => {
  try {
    const response = await artistAPI.add(input);

    dispatch({ type: artistTypes.ADD, payload: response.data });

    callback(response.data._id);
  } catch (e) {
    console.error(e);
    dispatch({
      type: artistTypes.ALERT,
      payload: { type: 'error', text: e.response.data.errorMessage },
    });
  }
};
