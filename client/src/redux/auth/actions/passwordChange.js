import { authAPI } from '../../../api';
import { alertTypes } from '../../alert';

export const passwordChange = values => async dispatch => {
  try {
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
