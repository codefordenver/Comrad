import { trafficTypes } from '../trafficTypes';
import { trafficAPI } from '../../../api';

export const findEarliest = (trafficType, callback) => async dispatch => {
  try {
    dispatch({ type: trafficTypes.LOAD });

    let result = await trafficAPI.findEarliest(trafficType);

    dispatch({ type: trafficTypes.EARLIEST, payload: result.data });

    if (typeof callback === 'function') {
      callback();
    }
  } catch (err) {
    console.log(err);
  }
};
