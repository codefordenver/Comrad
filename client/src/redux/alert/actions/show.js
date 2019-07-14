import { alertTypes } from '../alertTypes';

export const show = (type, header, body) => async dispatch => {
  dispatch({
    type: alertTypes.ACTIVE,
    payload: { type: type, header: header, body: body },
  });
};
