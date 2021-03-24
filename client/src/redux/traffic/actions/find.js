import axios from 'axios';

import { trafficTypes } from '../trafficTypes';
import { trafficAPI } from '../../../api';

export const find = (startTime, endTime, filterByType) => async dispatch => {
  try {
    dispatch({ type: trafficTypes.LOAD });

    const { data: traffic } = await trafficAPI.find(
      startTime,
      endTime,
      filterByType,
    );

    dispatch({ type: trafficTypes.FIND, payload: traffic });
  } catch (err) {
    if (axios.isCancel(err)) {
      // the request was cancelled, do nothing
    } else {
      console.log(err);
    }
  }
};
