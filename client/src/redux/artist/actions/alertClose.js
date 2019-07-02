import { artistTypes } from '../artistTypes';

export const alertClose = () => async dispatch => {
  try {
    dispatch({ type: artistTypes.ALERT_CLOSE });
  } catch (err) {
    console.log(err);
  }
};
