import axios from 'axios';
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR } from './types';

export const loginUser = (userInfo, callback) => async dispatch => {
  try {
    const response = await axios.post('/api/auth/login', userInfo);

    dispatch({ type: AUTH_LOGIN, payload: response.data });

    callback();
  } catch (e) {
    const { status } = e.response;
    let errorMessage = '';
    console.log(e.response);

    switch (status) {
      case 400:
        errorMessage = 'Please Fill In Form';
        break;
      case 401:
        errorMessage = 'Invalid Login Credentials';
        break;
      default:
        errorMessage = 'Unknown Error';
        break;
    }

    dispatch({ type: AUTH_ERROR, payload: errorMessage });
  }
};

export const logoutUser = callback => async dispatch => {
  try {
    await axios.get('/api/auth/logout');

    dispatch({ type: AUTH_LOGOUT });

    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Something went Wrong!' });
  }
};

export const fetchUser = () => async dispatch => {
  try {
    const response = await axios.get('/api/auth/current');

    dispatch({ type: AUTH_LOGIN, payload: response.data });
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: '' });
  }
};
