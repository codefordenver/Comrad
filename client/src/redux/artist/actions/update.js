import { artistAPI } from '../../../api';
import { artistTypes } from '../artistTypes';
import { alertTypes } from '../../alert';

export const update = ({ _id, ...rest }, callback) => async dispatch => {
  try {
    const response = await artistAPI.update(_id, rest);

    dispatch({ type: artistTypes.UPDATE, payload: response.data });

    callback();
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
