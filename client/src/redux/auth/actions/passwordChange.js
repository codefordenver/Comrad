import { authAPI } from '../../../api';
import { alertTypes } from '../../alert';
import { authTypes } from '../authTypes';

export const passwordChange = (values, callback) => async dispatch => {
  try {
    dispatch({ type: authTypes.PASSWORD_CHANGE });

    await authAPI.passwordChange(values);

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
