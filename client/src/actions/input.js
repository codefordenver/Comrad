import { INPUT_CLEAR, INPUT_UPDATE } from './types';

export const inputUpdate = value => async dispatch => {
  dispatch({ type: INPUT_UPDATE, payload: value });
};

export const inputClear = name => async dispatch => {
  dispatch({ type: INPUT_CLEAR, payload: name });
};
