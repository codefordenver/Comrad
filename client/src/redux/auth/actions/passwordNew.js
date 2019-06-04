import { authAPI } from '../../../api';
import { alertTypes } from '../../alert';
import { authTypes } from '../authTypes';

export const passwordNew = (values, callback) => async dispatch => {
  try {
    dispatch({ type: authTypes.LOADING });

    await authAPI.passwordNew(values);

    callback();

    dispatch({
      type: alertTypes.ACTIVE,
      payload: {
        header: 'Success',
        body: 'Your Password Has Been Successfully Resetted',
        type: 'success',
      },
    });
  } catch (err) {
    dispatch({
      type: alertTypes.ACTIVE,
      payload: {
        header: 'Error',
        body: 'Error resetting password',
        type: 'danger',
      },
    });
  }
};
