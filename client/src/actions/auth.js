import axios from 'axios';
import { AUTH_SIGNIN, AUTH_SIGNOUT, AUTH_FETCH, AUTH_ERROR } from './types';

export const signinUser = (userInfo, callback) => async dispatch => {
  try {
    const response = await axios.post('/api/auth/signin', userInfo);

    dispatch({ type: AUTH_SIGNIN, payload: { status: true, ...response.data }});

    callback();

  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid Login Credientials' });
  }
}

export const signoutUser = (callback) => async dispatch => {

  dispatch({ type: AUTH_SIGNOUT, payload: { status: false } });

  callback();
}

export const fetchUser = () => async dispatch => {
  try {
    const response = await axios.get('/api/auth/current');
    
    dispatch({ type: AUTH_FETCH, payload: { status: true, ...response.data }});
  } catch (e) {
    if(e) {
      dispatch({ type: AUTH_ERROR, payload: { message: 'Need to login first!', status: false }})
    }
  }

}