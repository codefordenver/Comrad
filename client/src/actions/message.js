import { MESSAGE_CLEAR, MESSAGE_UPDATE } from './types';

export const messageClear = () => async dispatch => {
  try {
    dispatch({ type: MESSAGE_CLEAR });
  } catch (e) {
    console.error(e);
  }
};

export const messageUpdate = payload => async dispatch => {
  try {
    dispatch({ type: MESSAGE_UPDATE, payload });
  } catch (e) {
    console.error(e);
  }
};
