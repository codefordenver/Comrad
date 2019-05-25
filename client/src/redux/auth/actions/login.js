import { authAPI } from '../../../api';
import { authTypes } from '../authTypes';
import { alertTypes } from '../../alert';

export const login = (values, callback) => async dispatch => {
  try {
    dispatch({ type: authTypes.LOADING });

    const { data: doc } = await authAPI.login(values);

    dispatch({ type: authTypes.LOGIN, payload: { doc } });

    callback();
  } catch (err) {
    dispatch({
      type: alertTypes.ACTIVE,
      payload: {
        header: 'Error',
        body: 'Invalid Login Credentials',
        type: 'danger',
      },
    });
  }
};
