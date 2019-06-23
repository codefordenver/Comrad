import { albumTypes } from '../albumTypes';

export const alertClose = () => async dispatch => {
  try {
    dispatch({ type: albumTypes.ALERT_CLOSE });
  } catch (err) {
    console.log(err);
  }
};
