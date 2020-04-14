import { alertTypes } from '../alertTypes';

export const hideWithoutChangingDisplayLocation = () => async dispatch => {
  dispatch({
    type: alertTypes.INACTIVE_DONT_CHANGE_DISPLAY_LOCATION,
  });
};
