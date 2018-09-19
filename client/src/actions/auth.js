import axios from 'axios';
import { AUTH_SIGNIN, AUTH_SIGNOUT, AUTH_ERROR } from './types';

export const signinUser = (userInfo, callback) => async dispatch => {
  try {
    const response = await axios.post('/api/auth/signin', userInfo);

    dispatch({ type: AUTH_SIGNIN, payload: response.data });

    callback();

  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid Login Credientials' });
  }
};

export const signoutUser = callback => async dispatch => {
  try {
    const response = await axios.get('/api/auth/signout');

    dispatch({ type: AUTH_SIGNOUT, payload: response.data });

    callback();

  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Something went Wrong!'})
  }
};

export const fetchUser = () => async dispatch => {
  try {
    const response = await axios.get('/api/auth/current');

    dispatch({ type: AUTH_SIGNIN, payload: response.data });

  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'User Not Authroized!' });
  }
};
