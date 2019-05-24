import { userTypes } from '../userTypes';

export const alertClose = () => async dispatch => {
  try {
    dispatch({ type: userTypes.ALERT_CLOSE });
  } catch (err) {
    console.log(err);
  }
};
