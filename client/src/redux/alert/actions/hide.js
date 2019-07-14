import { alertTypes } from '../alertTypes';

export const hide = (type, header, body) => async dispatch => {
  dispatch({
    type: alertTypes.INACTIVE,
  });
};
