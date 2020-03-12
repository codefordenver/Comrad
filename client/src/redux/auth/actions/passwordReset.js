import { authAPI } from '../../../api';
import { authTypes } from '../authTypes';
import { alertTypes } from '../../alert/alertTypes';

export const passwordReset = (values, callback) => async dispatch => {
  try {
    dispatch({ type: authTypes.LOADING });

    await authAPI.passwordReset(values);

    callback();

    dispatch({
      type: alertTypes.ACTIVE,
      payload: {
        header: 'Success',
        body: 'Please check your email for your reset link',
        type: 'success',
      },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: alertTypes.ACTIVE,
      payload: {
        header: 'Error',
        body:
          err.response.data === 'string'
            ? err.response.data
            : 'Unknown error trying to reset password',
        type: 'danger',
      },
    });
  }
};
