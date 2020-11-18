import { alertTypes } from '../../alert';
import { trafficAPI } from '../../../api';

export const removeInstanceFromSeries = (
  traffic,
  callback,
) => async dispatch => {
  try {
    const response = await trafficAPI.removeInstanceFromSeries(
      traffic.master_event_id._id,
      traffic,
    );
    callback(response);
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
