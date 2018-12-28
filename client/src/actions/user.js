import axios from 'axios';
import { MESSAGE_UPDATE, USER_FIND_ONE, USER_ADD, USER_ERROR } from './types';

export const userFindOne = id => async dispatch => {
  try {
    const response = await axios.get(`/api/user/${id}`);

    dispatch({ type: USER_FIND_ONE, payload: response.data });
  } catch (e) {
    console.log(e);
  }
};

export const userAdd = (obj, callback) => async dispatch => {
  try {
    const response = await axios.post('/api/user', obj);

    dispatch({ type: USER_ADD, payload: response.data });

    callback();
  } catch (e) {
    console.log(e.response);
    dispatch({
      type: MESSAGE_UPDATE,
      payload: { type: 'error', text: e.response.data.errorMessage },
    });
  }
};
