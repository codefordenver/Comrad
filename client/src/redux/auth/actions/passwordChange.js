import { authAPI } from '../../../api';
import { alertTypes } from '../../alert';

export const passwordChange = values => async dispatch => {
  try {
    await authAPI.passwordChange(values);
    dispatch({
      type: alertTypes.ACTIVE,
      payload: {
        header: 'Success',
        body: 'Your password has been successfully changed',
        type: 'success',
      },
    });
  } catch (err) {
    dispatch({
      type: alertTypes.ACTIVE,
      payload: {
        header: 'Error',
        body: 'Error changing password',
        type: 'danger',
      },
    });
  }
};
