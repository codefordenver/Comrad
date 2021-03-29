import axios from 'axios';

import { trafficTypes } from '../trafficTypes';
import { trafficAPI } from '../../../api';

export const find = (
  startTime,
  endTime,
  filterByType,
  cancellableRequestId = false, // if provided, this should be a string. Only one active request using this cancellableRequestId will be allowed at a time. Subsequent requests will cause previous unfinished requests to be cancelled.
) => async dispatch => {
  try {
    dispatch({ type: trafficTypes.LOAD });

    const { data: traffic } = await trafficAPI.find(
      startTime,
      endTime,
      filterByType,
      cancellableRequestId,
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
