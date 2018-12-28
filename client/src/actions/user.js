import axios from 'axios';
import { MESSAGE_UPDATE, USER_FIND_ONE, USER_ADD } from './types';

export const userFindOne = id => async dispatch => {
  try {
    const response = await axios.get(`/api/user/${id}`);

    dispatch({ type: USER_FIND_ONE, payload: response.data });
  } catch (e) {
    console.log(e);
  }
};

export const userAdd = (input, callback) => async dispatch => {
  try {
    const response = await axios.post('/api/user', input);

    dispatch({ type: USER_ADD, payload: response.data });

    callback();
  } catch (e) {
    dispatch({
      type: MESSAGE_UPDATE,
      payload: { type: 'error', text: e.response.data.errorMessage },
    });
  }
};
