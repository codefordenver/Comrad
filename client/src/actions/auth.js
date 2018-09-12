import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const signin = (userInfo, callback) => async dispatch => {
  try {
    const response = await axios.post('/api/user/signin', userInfo);

    dispatch({ type: AUTH_USER, payload: response.data.token });

    localStorage.setItem('token', response.data.token);

    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid Login Credientials' })
  }
}

export const signout = (callback) => async dispatch => {
  localStorage.removeItem('token');

  dispatch({ type: AUTH_USER, payload: '' });

  callback();
}