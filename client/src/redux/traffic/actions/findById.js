import { trafficTypes } from '../trafficTypes';
import { trafficAPI } from '../../../api';

export const findById = id => async dispatch => {
  try {
    dispatch({ type: trafficTypes.LOAD });

    const { data: traffic } = await trafficAPI.findById(id);

    dispatch({ type: trafficTypes.FIND_BY_ID, payload: traffic });
  } catch (err) {
    console.log(err);
  }
};
