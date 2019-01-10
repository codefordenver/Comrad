import { INPUT_CLEAR, INPUT_UPDATE } from './types';

export const inputClear = name => async dispatch => {
  try {
    dispatch({ type: INPUT_CLEAR, payload: name });
  } catch (e) {
    console.error(e);
  }
};

export const inputUpdate = value => async dispatch => {
  try {
    dispatch({ type: INPUT_UPDATE, payload: value });
  } catch (e) {
    console.error(e);
  }
};
