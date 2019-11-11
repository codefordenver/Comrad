import { alertTypes } from '../../alert';
import { trafficAPI } from '../../../api';

export const updateSeries = (data, callback) => async dispatch => {
  try {
    const response = await trafficAPI.updateSeries(data._id, data);
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
