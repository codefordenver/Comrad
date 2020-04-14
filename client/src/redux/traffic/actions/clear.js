import { trafficTypes } from '../trafficTypes';

export const clear = () => async dispatch => {
  try {
    dispatch({ type: trafficTypes.CLEAR });
  } catch (err) {
    console.log(err);
  }
};
