import { ALERT_CLEAR, ALERT_UPDATE } from './types';

export const alertClear = () => async dispatch => {
  try {
    dispatch({ type: ALERT_CLEAR });
  } catch (e) {
    console.error(e);
  }
};

export const alertUpdate = payload => async dispatch => {
  try {
    dispatch({ type: ALERT_UPDATE, payload });
  } catch (e) {
    console.error(e);
  }
};
