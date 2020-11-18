import { alertTypes } from '../../alert';
import { trafficAPI } from '../../../api';
import { trafficTypes } from '../trafficTypes';

export const update = (
  trafficId,
  changedValues,
  callback,
) => async dispatch => {
  try {
    const response = await trafficAPI.update(trafficId, changedValues);
    callback(response);
    dispatch({
      type: trafficTypes.FIND_BY_ID,
      payload: response.data,
    });
  } catch (e) {
    console.error(e);
    dispatch({
      type: alertTypes.ACTIVE,
      payload: {
        type: 'danger',
        header: 'Error',
        body: e.response.data.errorMessage,
      },
    });
  }
};
