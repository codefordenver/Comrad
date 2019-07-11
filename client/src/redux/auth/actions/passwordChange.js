import { authAPI } from '../../../api';
import { alertTypes } from '../../alert';
import { authTypes } from '../authTypes';

export const passwordChange = values => async dispatch => {
  try {
    dispatch({ type: authTypes.PASSWORD_CHANGE });

    await authAPI.passwordChange(values);

    dispatch({
      type: alertTypes.ACTIVE,
      payload: {
        header: 'Success',
        body: 'Your Password Has Been Successfully Resetted',
        type: 'success',
      },
    });
  } catch (err) {
    console.log(err);
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
