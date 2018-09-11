import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post('/api/user/signin', formProps);

    dispatch({ type: AUTH_USER, payload: response.data.token });

    localStorage.setItem('token', response.data.token);

    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid Login Credientials' })
  }
}