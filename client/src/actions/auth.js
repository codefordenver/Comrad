import axios from 'axios';
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR } from './types';

export const loginUser = (userInfo, callback) => async dispatch => {
  try {
    const response = await axios.post('/api/auth/login', userInfo);

    dispatch({ type: AUTH_LOGIN, payload: response.data });

    callback();

  } catch (e) {
    // const { status } = e.response;
    // console.log(e.response);

    // switch(status) {
    //   case 401:
    //     dispatch({ type: AUTH_ERROR, payload: 'Invalid Email/Password Combination' });
    //     break;
    //   default:
    //     dispatch({ type: AUTH_ERROR, payload: e.response.data });
    //     break;
    // }
  }
};

export const logoutUser = callback => async dispatch => {
  try {
    await axios.get('/api/auth/logout');

    dispatch({ type: AUTH_LOGOUT });

    callback();

  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Something went Wrong!'})
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
