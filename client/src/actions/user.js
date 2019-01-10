import axios from 'axios';
import { ALERT_UPDATE, USER_FIND_ONE, USER_ADD } from './types';

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
