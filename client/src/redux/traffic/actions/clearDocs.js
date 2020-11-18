import { trafficTypes } from '../trafficTypes';

export const clearDocs = () => async dispatch => {
  try {
    dispatch({ type: trafficTypes.CLEAR_DOCS });
  } catch (err) {
    console.log(err);
  }
};
