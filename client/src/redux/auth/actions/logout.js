import { authAPI } from '../../../api';
import { authTypes } from '../authTypes';

export const logout = callback => async dispatch => {
  try {
    await authAPI.logout('/v1/auth/logout');

    dispatch({ type: authTypes.LOGOUT });

    callback();
  } catch (err) {
    console.log(err);
  }
};
