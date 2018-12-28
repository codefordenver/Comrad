import { MESSAGE_CLEAR, MESSAGE_UPDATE } from './types';

export const messageClear = () => async dispatch => {
  try {
    dispatch({ type: MESSAGE_CLEAR });
  } catch (e) {
    console.log(e);
  }
};

export const messageUpdate = ({ type, text }) => async dispatch => {
  try {
    dispatch({ type: MESSAGE_UPDATE, payload: { type, text } });
  } catch (e) {
    console.log(e);
  }
};
