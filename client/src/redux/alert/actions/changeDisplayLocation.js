import { alertTypes } from '../alertTypes';

export const changeDisplayLocation = location => async dispatch => {
  dispatch({
    type: alertTypes.CHANGE_DISPLAY_LOCATION,
    payload: location,
  });
};
