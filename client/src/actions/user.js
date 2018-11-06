import axios from 'axios';
import { USER_FIND_ONE, USER_ADD, USER_ERROR } from './types';

export const userFindOne = id => async dispatch => {
  try {
    const response = await axios.get(`/api/user/${id}`);

    dispatch({ type: USER_FIND_ONE, payload: response.data });
  } catch (e) {
    console.log(e);
  }
}

export const userAdd = (obj, cb) => async dispatch => {
  try {
    const response = await axios.post('/api/user', obj);

    dispatch({ type: USER_ADD, payload: response.data });

    cb();
  } catch (e) {
    dispatch({ type: USER_ERROR, payload: e.response.data });
  }
}