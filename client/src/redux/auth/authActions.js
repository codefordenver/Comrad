import axios from 'axios';
import {
  AUTH_ALERT,
  AUTH_ALERT_CLOSE,
  AUTH_LOADING,
  AUTH_LOGIN,
  AUTH_LOGOUT,
} from './authTypes';

export const authLogin = ({ email, password }, callback) => async dispatch => {
  try {
    dispatch({ type: AUTH_LOADING });

    const response = await axios.post('/api/auth/login', { email, password });

    callback();

    return dispatch({ type: AUTH_LOGIN, payload: response.data });
  } catch (e) {
    dispatch({
      type: AUTH_ALERT,
      payload: {
        header: 'Error',
        message: 'Invalid login credentials',
        type: 'danger',
      },
    });
  }
};

export const authLogout = callback => async dispatch => {
  try {
    await axios.get('/api/auth/logout');

    dispatch({ type: AUTH_LOGOUT });

    callback();
  } catch (err) {
    console.log(err);
  }
};

export const authFetch = () => async dispatch => {
  try {
    dispatch({ type: AUTH_LOADING });

    const response = await axios.get('/api/auth/current');

    dispatch({ type: AUTH_LOGIN, payload: response.data });
  } catch (e) {
    dispatch({ type: AUTH_LOGOUT });
  }
};

export const authPasswordReset = ({ email }) => async dispatch => {
  try {
    dispatch({ type: AUTH_LOADING });

    await axios.put(`/api/auth/password/reset`, { email });

    dispatch({
      type: AUTH_ALERT,
      payload: {
        header: 'Success',
        message: 'Please check your email for your reset link',
        type: 'success',
      },
    });
  } catch (err) {
    dispatch({
      type: AUTH_ALERT,
      payload: {
        header: 'Error',
        message: 'Error trying to reset your password',
        type: 'danger',
      },
    });
  }
};

export const authPasswordNew = (
  { passwordConfirm, passwordNew, resetToken },
  callback,
) => async dispatch => {
  try {
    dispatch({ type: AUTH_LOADING });

    await axios.put(`/api/auth/password/new`, {
      passwordConfirm,
      passwordNew,
      resetToken,
    });

    dispatch({
      type: AUTH_ALERT,
      payload: {
        header: 'Success',
        message: 'Your Password Has Been Successfully Resetted',
        type: 'success',
      },
    });

    callback();
  } catch (err) {
    dispatch({
      type: AUTH_ALERT,
      payload: {
        header: 'Error',
        message: 'Error resetting password',
        type: 'danger',
      },
    });
  }
};

export const authAlertClose = () => async dispatch => {
  try {
    dispatch({ type: AUTH_ALERT_CLOSE });
  } catch (err) {
    console.log(err);
  }
};
