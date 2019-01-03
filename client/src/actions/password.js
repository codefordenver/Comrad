import axios from 'axios';
import { MESSAGE_UPDATE } from './types';

export const requestReset = input => async dispatch => {
  try {
    const { email } = input;
    await axios.put('/api/password/request', { email });

    dispatch({
      type: MESSAGE_UPDATE,
      payload: {
        header: 'Success',
        text: 'Please check your email for your reset link',
        type: 'success',
      },
    });
  } catch (e) {
    console.log(e.response);
  }
};

export const resetPassword = input => async dispatch => {
  try {
    const { confirm_password, password, resetToken } = input;
    axios.put('/api/password/reset', {
      confirm_password,
      password,
      resetToken,
    });

    dispatch({
      type: MESSAGE_UPDATE,
      payload: {
        header: 'Success',
        text: 'Your password has been successfully resetted',
        type: 'success',
      },
    });
  } catch (e) {
    console.log(e.response);
  }
};
