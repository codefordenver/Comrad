import axios from 'axios';
import {
  USER_ALERT,
  ALERT_UPDATE,
  USER_FIND_ONE,
  USER_ADD,
  USER_LOADING,
  USER_FIND_ALL,
  USER_SEARCH,
} from './types';

export const userFindOne = id => async dispatch => {
  try {
    const response = await axios.get(`/api/user/${id}`);

    dispatch({ type: USER_FIND_ONE, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const userFindAll = () => async dispatch => {
  try {
    dispatch({ type: USER_LOADING });

    const response = await axios.get(`/api/user`);

    const { data: docs } = response;

    dispatch({
      type: USER_FIND_ALL,
      payload: {
        docs,
      },
    });
  } catch (err) {
    dispatch({
      type: USER_ALERT,
      payload: {
        header: 'Error',
        text: 'There was an error loading all users',
        type: 'danger',
      },
    });
  }
};

export const userSearch = values => async dispatch => {
  try {
    dispatch({ type: USER_LOADING });

    const { q } = values;

    const response = await axios.get(`/api/user/search?q=${q}`);

    dispatch({
      type: USER_SEARCH,
      payload: response.data,
    });
  } catch (e) {
    console.log(e);
  }
};

// export const userSearch = values => async dispatch => {};

export const userAdd = (input, callback) => async dispatch => {
  try {
    const response = await axios.post('/api/user', input);

    dispatch({ type: USER_ADD, payload: response.data });

    callback();
  } catch (e) {
    dispatch({
      type: ALERT_UPDATE,
      payload: { type: 'error', text: e.response.data.errorMessage },
    });
  }
};

// export const requestReset = input => async dispatch => {
//   try {
//     dispatch({
//       type: USER_LOADING,
//     });

//     const { email } = input;

//     const response = await axios.put('/api/user/request', { email });

//     dispatch({
//       type: MESSAGE_UPDATE,
//       payload: {
//         header: 'Success',
//         type: 'success',
//         text: 'Please check your email for your reset link!',
//       },
//     });
//     dispatch({
//       type: USER_CLEAR,
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };
