import { artistAPI } from '../../../api';
import { artistTypes } from '../artistTypes';
import { alertTypes } from '../../alert';

export const add = (input, callback) => async dispatch => {
  try {
    const response = await artistAPI.add(input);

    dispatch({ type: artistTypes.ADD, payload: response.data });

    callback(response.data);
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
