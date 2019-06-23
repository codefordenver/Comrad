import { trackTypes } from '../trackTypes';

export const alertClose = () => async dispatch => {
  try {
    dispatch({ type: trackTypes.ALERT_CLOSE });
  } catch (err) {
    console.log(err);
  }
};
